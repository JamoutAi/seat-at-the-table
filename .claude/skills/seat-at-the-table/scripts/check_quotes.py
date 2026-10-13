#!/usr/bin/env python
"""
Check every quoted line in a council session against the seats' brains.

Usage:
  python .claude/skills/seat-at-the-table/scripts/check_quotes.py <session folder>

Scans round-*.md and verdict.md for quotes attributed to a source id, like "..." (S095), and looks
for each in the brain files. A quote that is in no brain is either a quote of
another seat or the founder (fine if it appears in an earlier round file of the
same session) or an invented quote (flag it and remove it from the verdict).
Exit code 1 if any quote is unaccounted for.
"""
import re
import sys
from pathlib import Path

BRAINS = Path(__file__).resolve().parents[1] / "brains"


def norm(s):
    s = s.lower().replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"')
    s = re.sub(r"[^a-z0-9' ]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def main():
    session = Path(sys.argv[1])
    brain_text = norm(" ".join(p.read_text(encoding="utf-8", errors="replace") for p in BRAINS.rglob("*.md")))
    session_files = sorted(session.glob("round-*.md")) + [p for p in [session / "verdict.md"] if p.exists()]
    brief = norm((session / "brief.md").read_text(encoding="utf-8")) if (session / "brief.md").exists() else ""
    bad, ok, internal = [], 0, 0
    seen_session = ""
    for f in session_files:
        text = f.read_text(encoding="utf-8", errors="replace")
        # only quotes attributed to a source id, e.g. "..." (S095) or "..." [S048, 2026]
        for q in re.findall(r"[\"“]([^\"“”\n]{20,400})[\"”][^\n\"]{0,40}?[\(\[]S\d{3}", text):
            nq = norm(q)
            if len(nq.split()) < 6:
                continue
            if nq in brain_text:
                ok += 1
            elif nq in seen_session or nq in brief:
                internal += 1
            else:
                bad.append((f.name, q))
        seen_session += " " + norm(text)
    print(f"brain quotes verified: {ok}; quotes of earlier rounds or the brief: {internal}; unverified: {len(bad)}")
    for name, q in bad:
        print(f"  UNVERIFIED [{name}] \"{q[:160]}\"")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
