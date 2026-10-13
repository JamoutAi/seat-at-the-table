import fs from "node:fs";
import path from "node:path";
import { AGENTS_DIR, BRAINS_DIR } from "./env.mjs";

export const SEATS = [
  { key: "sandberg", name: "Sheryl Sandberg", short: "Sandberg", initials: "SS", slug: "sheryl-sandberg", aliases: ["sheryl sandberg", "sheryl", "sandberg"], pillar: "Strategy and scale", question: "Is this the right bet, and can it scale?", dimension: "Strategic fit and scalability", color: "#f2a541" },
  { key: "hormozi", name: "Alex Hormozi", short: "Hormozi", initials: "AH", slug: "alex-hormozi", aliases: ["alex hormozi", "alex", "hormozi"], pillar: "Offers, pricing, and sales", question: "Will people pay, how much, and how do we close?", dimension: "Offer strength and unit economics", color: "#e5501d" },
  { key: "kernlima", name: "Jamie Kern Lima", short: "Kern Lima", initials: "JK", slug: "jamie-kern-lima", aliases: ["jamie kern lima", "kern lima", "kernlima", "jamie"], pillar: "Product and customers", question: "Do customers truly want this, and will you bet on yourself?", dimension: "Customer demand and founder conviction", color: "#ff78c8" },
  { key: "oprah", name: "Oprah Winfrey", short: "Oprah", initials: "OW", slug: "oprah-winfrey", aliases: ["oprah winfrey", "oprah", "winfrey"], pillar: "Audience, trust, and purpose", question: "Does this serve your people, and is it true to who you are?", dimension: "Audience trust and alignment", color: "#b496ff" },
  { key: "garyvee", name: "Gary Vaynerchuk", short: "Gary V", initials: "GV", slug: "gary-vaynerchuk", aliases: ["gary vaynerchuk", "gary vee", "gary v", "garyvee", "gary", "vaynerchuk"], pillar: "Marketing and attention", question: "Where does the attention come from, and is it underpriced?", dimension: "Attention and distribution", color: "#ffd65c" },
  { key: "leila", name: "Leila Hormozi", short: "Leila", initials: "LH", slug: "leila-hormozi", aliases: ["leila hormozi", "leila"], pillar: "Operations, hiring, and team", question: "Who runs this, and can the team carry it without you?", dimension: "Team capacity and operational readiness", color: "#5fd0a8" },
  { key: "huffington", name: "Arianna Huffington", short: "Huffington", initials: "AH", slug: "arianna-huffington", aliases: ["arianna huffington", "arianna", "huffington"], pillar: "Founder energy and sustainability", question: "What will this cost your energy, health, and focus?", dimension: "Founder sustainability", color: "#78c8ff" },
  { key: "codie", name: "Codie Sanchez", short: "Codie", initials: "CS", slug: "codie-sanchez", aliases: ["codie sanchez", "codie", "sanchez"], pillar: "Money, cash flow, and ownership", question: "What does it do to cash, risk, and what you own?", dimension: "Cash flow, downside, and ownership", color: "#ffb38a" },
];
export const byKey = Object.fromEntries(SEATS.map((s) => [s.key, s]));

/** Any way a seat gets written ("Gary V", "garyvee", "LEILA (Ops)", "Alex Hormozi") -> seat key.
 * Exact matches first, then the longest alias found as whole words, so "Leila Hormozi" never lands on Alex. */
export function matchSeat(x, seats = SEATS) {
  const t = " " + String(x || "").toLowerCase().replace(/\(.*$/, "").replace(/[^a-z ]/g, " ").replace(/\s+/g, " ").trim() + " ";
  if (t.trim() === "") return null;
  const exact = seats.find((s) => [s.key, s.short.toLowerCase(), s.name.toLowerCase(), ...(s.aliases || [])].includes(t.trim()));
  if (exact) return exact.key;
  const pairs = seats.flatMap((s) => (s.aliases || [s.name.toLowerCase()]).map((a) => [a, s.key])).sort((a, b) => b[0].length - a[0].length);
  return pairs.find(([a]) => t.includes(" " + a + " "))?.[1] || null;
}

const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "");
const stripFront = (t) => t.replace(/^---[\s\S]*?\n---\n/, "");

const systemCache = new Map();
/** The seat's agent instructions plus its brain, loaded inline (the API has no file tools). */
export function systemFor(key) {
  if (systemCache.has(key)) return systemCache.get(key);
  const s = byKey[key];
  const agent = stripFront(read(path.join(AGENTS_DIR, `council-${key}.md`)));
  const brain = ["_hot.md", "frameworks.md", "positions.md", "principles.md", "voice.md"]
    .map((f) => `\n\n===== brains/${s.slug}/${f} =====\n` + read(path.join(BRAINS_DIR, s.slug, f)))
    .join("");
  const text =
    agent +
    "\n\n## Runtime note\nYou are running in the A Seat at the Table app. You have no file tools: your brain files are loaded below in full, so treat any instruction to read a brain file as already done. Never mention files, tools, or this note in your answer.\n" +
    brain;
  const system = [{ type: "text", text, cache_control: { type: "ephemeral" } }];
  systemCache.set(key, system);
  return system;
}

// ---------- quote verification against the brain ----------
const norm = (s) =>
  s.toLowerCase().replace(/[‘’]/g, "'").replace(/'\s+(t|s|re|ll|ve|d|m)\b/g, "'$1")
    .replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim();
const brainText = new Map();
function brainNorm(key) {
  if (!brainText.has(key)) {
    const dir = path.join(BRAINS_DIR, byKey[key].slug);
    const all = fs.existsSync(dir) ? fs.readdirSync(dir).map((f) => read(path.join(dir, f))).join(" ") : "";
    brainText.set(key, norm(all));
  }
  return brainText.get(key);
}
/** Quotes the seat attributed to a source id, each marked verified or not. */
export function checkQuotes(key, text) {
  const out = [];
  const re = /["“]([^"“”\n]{20,400})["”][^\n"]{0,40}?[(\[](S\d{3})/g;
  let m;
  const hay = brainNorm(key);
  while ((m = re.exec(text))) {
    const q = norm(m[1]);
    if (q.split(" ").length < 5) continue;
    out.push({ quote: m[1], source: m[2], verified: hay.includes(q) || hay.replace(/ /g, "").includes(q.replace(/ /g, "")) });
  }
  return out;
}

// ---------- card parsing ----------
const field = (text, label) => {
  // label at line start, or after a "·" or "|" when several fields share a line
  const m = text.match(new RegExp(`(?:^|[·|])[ \\t]*\\**${label}\\**[ \\t]*:[ \\t]*([^\\n·]+)`, "im"));
  return m ? m[1].replace(/\*+/g, "").trim() : "";
};
const num = (s) => { const m = (s || "").match(/(\d+(?:\.\d+)?)/); return m ? Number(m[1]) : null; };

export function parseOptionScores(text, optionIds) {
  // the option line itself uses "·" between options, so read to end of line
  const lm = text.match(/OPTION SCORES\**[ \t]*:[ \t]*([^\n]+)/i);
  const line = (lm ? lm[1] : "").split(/PILLAR SCORE|CONFIDENCE|FINAL SCORE/i)[0];
  const scores = {};
  for (const id of optionIds) {
    const m = line.match(new RegExp(`\\b${id}\\b\\s*[:=]?\\s*(\\d+(?:\\.\\d+)?)`));
    if (m) scores[id] = Math.max(0, Math.min(10, Number(m[1])));
  }
  return scores;
}

export function parseCard(text, optionIds) {
  const stance = field(text, "STANCE");
  const ruin = (field(text, "RUIN RISK").match(/none|possible|likely/i) || [""])[0].toLowerCase();
  const disagree = field(text, "I DISAGREE MOST WITH");
  const target = SEATS.find((s) => new RegExp(`\\b(${s.short}|${s.name.split(" ").pop()})\\b`, "i").test(disagree.slice(0, 40)));
  const voteRaw = field(text, "VOTE");
  const vote = /dissent/i.test(voteRaw) ? "dissent" : /amend/i.test(voteRaw) ? "amend" : /endorse/i.test(voteRaw) ? "endorse" : "";
  return {
    stance,
    call: field(text, "THE CALL"),
    optionScores: parseOptionScores(text, optionIds),
    pillar: num(field(text, "PILLAR SCORE")) ?? num(field(text, "FINAL PILLAR SCORE")),
    finalScore: num(field(text, "FINAL SCORE")),
    confidence: num(field(text, "CONFIDENCE")),
    ruin,
    door: (field(text, "DOOR").match(/one-way|two-way/i) || [""])[0].toLowerCase(),
    disagreeWith: target ? target.key : null,
    disagreeLine: disagree,
    concede: field(text, "I CONCEDE"),
    moved: field(text, "MOVED"),
    vote,
    amendment: field(text, "AMENDMENT OR DISSENT"),
    oneLine: field(text, "ONE LINE FOR THE FOUNDER"),
    question: field(text, "QUESTION FOR THE FOUNDER"),
    risk: field(text, "THE RISK I SEE"),
    thisWeek: field(text, "WHAT I'D DO THIS WEEK"),
  };
}
