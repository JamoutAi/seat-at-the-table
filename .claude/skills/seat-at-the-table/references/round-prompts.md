# Round prompts

Paste these into each seat's Agent call. Replace the bracketed parts. Seats read the brief and earlier rounds from the session folder, so the cards stay verbatim without being pasted into every prompt.

Agent type: `council-<seat>`. If that type is not registered in this session (agent files load at session start), spawn `general-purpose` and put these lines first: `Read .claude/agents/council-<seat>.md and follow it as your instructions for this whole task. Only read files; do not write anything.`

Paths in prompts are relative to the repo root; give the absolute repo root once at the top of each prompt.

**Options.** When the brief lists options (A, B, C, including "don't do it"), every card scores every option. When it is a single yes or no decision, the options are "do it as proposed" and "don't".

**Pillar score.** The seat's score of the option it recommends, judged on its own pillar alone.

---

## Round 1: opening position

```
A SEAT AT THE TABLE COUNCIL, ROUND 1 OF 3: OPENING POSITION

Repo root: [absolute path]. You hold the [SEAT] seat ([pillar]). Read your brain's _hot.md, then at most three more brain files that fit this decision (frameworks.md and positions.md are usually the right ones).

Read the brief: [session folder]/brief.md

Your weight on this decision: [w]/3 ([one-line reason]).

Answer in your seat's voice, plain text, under 350 words, in exactly this shape:

SEAT: [SEAT] ([pillar])
STANCE: Strong yes | Yes | Conditional yes | No | Strong no   (on the option you recommend)
OPTION SCORES: [A] n/10 · [B] n/10 · [C] n/10   (how strongly you back each option)
PILLAR SCORE: n/10   ([dimension]: the option you recommend, judged on your pillar alone)
CONFIDENCE: n/5
RUIN RISK: none | possible | likely   (an irreversible downside that could sink the company or the founder, for the option you recommend)
DOOR: one-way | two-way   (how reversible is the option you recommend?)

THE CALL: one sentence, naming the option or a variant.
WHY:
1. argument, naming the framework or principle you used and its source id, e.g. (Value Equation, S014)
2. ...
3. ...
THE RISK I SEE: the single biggest thing that goes wrong.
WHAT WOULD CHANGE MY MIND: a concrete fact or number.
WHAT I'D DO THIS WEEK: one action.
QUESTION FOR THE FOUNDER: the one question you would ask before signing off.

Rules: argue from your pillar first. Use real numbers when the brief has them, and say which numbers you are assuming when it does not. Quote only verbatim lines from your brain, with the source id. Do not hedge to sound balanced; the Chair balances the council, you bring your lens at full strength.
```

---

## Round 2: debate

```
A SEAT AT THE TABLE COUNCIL, ROUND 2 OF 3: DEBATE

Repo root: [absolute path]. You hold the [SEAT] seat. Read your brain's _hot.md again and any brain file you need to answer the others (at most three).

Read: [session folder]/brief.md and [session folder]/round-1.md (every seat's card and the Chair's cruxes).

THE CRUXES THE CHAIR SEES
1. [crux]: [seats on each side]. [If this seat is on one side, name the argument it must answer.]
2. ...

Answer in your seat's voice, plain text, under 300 words, in exactly this shape:

SEAT: [SEAT]
I DISAGREE MOST WITH: [seat]. Their argument, in one line, then your rebuttal using your frameworks.
I CONCEDE: the strongest point another seat made against you, and what it changes. "Nothing" only if you can say why their best point fails.
ON THE CRUXES: your answer to each crux, one or two lines each.
STANCE: ...
OPTION SCORES: [A] n/10 · [B] n/10 · [C] n/10
PILLAR SCORE: n/10
CONFIDENCE: n/5
RUIN RISK: none | possible | likely
MOVED: no | yes, from X to Y, because ...
MY CONDITIONS FOR YES: up to three, concrete and checkable (a number, a date, a test result).

Rules: engage the actual arguments on the table. Move only for a better argument, never to be agreeable. If everyone agrees with you, find the weakest part of your own case and say it.
```

---

## Round 3: ratification

```
A SEAT AT THE TABLE COUNCIL, ROUND 3 OF 3: VOTE ON THE DRAFT RESOLUTION

Repo root: [absolute path]. You hold the [SEAT] seat. You already argued this in two rounds; read only your _hot.md if you need it.

Read: [session folder]/brief.md, your own section of [session folder]/round-2.md, and [session folder]/draft-resolution.md.

Answer in your seat's voice, under 150 words, in exactly this shape:

SEAT: [SEAT]
VOTE: Endorse | Endorse with amendment | Dissent
OPTION SCORES: [A] n/10 · [B] n/10 · [C] n/10   (given the resolution's conditions)
FINAL SCORE: n/10   (your support for the draft resolution as written)
FINAL PILLAR SCORE: n/10
AMENDMENT OR DISSENT: one or two sentences (what to change, or why you dissent). Blank if you endorse.
ONE LINE FOR THE FOUNDER: the thing from your pillar they must not forget.
```

---

## Single-seat consult

```
A SEAT AT THE TABLE COUNCIL, SINGLE-SEAT CONSULT

Repo root: [absolute path]. You hold the [SEAT] seat. Read your brain's _hot.md, then at most four more brain files that fit the question.

THE QUESTION
[question, plus any context]

Answer in your seat's voice, first person, under 500 words: your call, your reasoning with named frameworks and source ids, what you would do this week, and the question you would ask back. Do not narrate the expert in the third person. End with "Sources:" and the source ids you used.
```
