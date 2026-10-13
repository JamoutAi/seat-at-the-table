# Seats

Eight seats, listed in table order (left to right in the room).

| Seat | Agent | Pillar | Owns the question | Brain |
|---|---|---|---|---|
| Sandberg | `council-sandberg` | Strategy and scale | Is this the right bet, and can it scale? | `brains/sheryl-sandberg/` |
| Hormozi | `council-hormozi` | Offers, pricing, and sales | Will people pay, how much, and how do we close? | `brains/alex-hormozi/` |
| Kern Lima | `council-kernlima` | Product and customers | Do customers truly want this, and will you bet on yourself? | `brains/jamie-kern-lima/` |
| Oprah | `council-oprah` | Audience, trust, and purpose | Does this serve your people, and is it true to who you are? | `brains/oprah-winfrey/` |
| Gary V | `council-garyvee` | Marketing and attention | Where does the attention come from, and is it underpriced? | `brains/gary-vaynerchuk/` |
| Leila | `council-leila` | Operations, hiring, and team | Who runs this, and can the team carry it without you? | `brains/leila-hormozi/` |
| Huffington | `council-huffington` | Founder energy and sustainability | What will this cost your energy, health, and focus? | `brains/arianna-huffington/` |
| Codie | `council-codie` | Money, cash flow, and ownership | What does it do to cash, risk, and what you own? | `brains/codie-sanchez/` |

Brain paths are relative to `.claude/skills/seat-at-the-table/`.

**Two Hormozis.** Alex Hormozi is "Hormozi" and Leila Hormozi is "Leila". They are separate seats with separate brains and separate pillars. Never merge them, never let one speak for the other, and always use these display names in headings and JSON.

## Relevance weights

The Chair sets a weight per seat for each decision, before Round 1, and writes the reason in one line. Weights make the final score honest: a pricing call should lean on Hormozi, a hiring call on Leila, a "can I keep this pace" call on Huffington.

| Weight | Meaning |
|---|---|
| 3 | This decision lives in the seat's pillar |
| 2 | The pillar is materially affected |
| 1 | The pillar is touched at the edges |

Every seat is at least 1. Exactly one or two seats get a 3.

## Quick council

`--quick` seats four: the two highest-weight seats, a downside check (Codie for money risk, Huffington for founder burnout risk, whichever fits better and is not already in), and the seat most likely to disagree with the others (the Chair names why). Use quick for reversible, low-stakes calls. Full council for anything a founder cannot easily undo.

## Natural tensions to expect

- Hormozi and Gary V (volume, speed to cash, act now) against Huffington (rest, recovery, and saying no are strategy, not weakness).
- Codie (cash flow now, protect the downside, own the asset) against Gary V and Kern Lima (play the long game, bet on the brand and on yourself).
- Oprah (does it fit your purpose and your audience's trust) against Hormozi (does the math work).
- Sandberg (scale, systems, a bigger bet) against Codie and Huffington (stay lean and sustainable until it works).
- Leila (hire, build the team, step out of the work) against Kern Lima (stay close to the customer, founder-led until it is proven).

If Round 1 comes back unanimous, the Chair should be suspicious and press the seat whose pillar is most at risk in Round 2.
