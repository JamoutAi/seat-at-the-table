# Scoring

All numbers come from the seats' cards. The Chair computes, never invents. Use the last round that ran (Round 3 if it ran, else Round 2).

## Option scores (the main number)

Every card scores every option 0 to 10. For each option:

`option score = sum(weight x seat's score for that option) / sum(weight)`, one decimal.

The **recommended option** is the one with the highest option score, unless an override below removes it. Show every option's math in one line each, for example: `B (3x6 + 2x7 + 2x8 + 2x6) / 9 = 6.7`.

## Verdict bands (on the recommended option's score)

| Option score | Verdict |
|---|---|
| 7.5 to 10 | GO |
| 6.0 to 7.4 | GO WITH CONDITIONS |
| 4.5 to 5.9 | RESHAPE |
| below 4.5 | DON'T DO IT |

Two labels replace the band when they fit better, and the report says why:

- **WAIT**: the recommended option is good but depends on a prerequisite that is not met yet (a test result, cash, a hire). WAIT always names the trigger and the date that turn it into GO, and what happens if the trigger fails.
- **DON'T DO IT** also applies when "don't do it" is itself the top-scoring option.

## Resolution support

Round 3's FINAL SCORE is each seat's support for the draft resolution as written. Report its weighted average as "Support for the resolution". It measures how well the Chair's plan captured the room, not whether the idea is good.

## Overrides (applied after the band, and stated in the report)

1. **Ruin cap.** Any seat that ends at `RUIN RISK: likely` on the recommended option caps the verdict at RESHAPE until the resolution names a mitigation that seat endorsed. One seat at ruin risk outweighs seven enthusiastic seats.
2. **One-way door cap.** If the recommended option is a one-way door (Sandberg's call, or a majority of seats) and the spread on it is 4 or more, cap at GO WITH CONDITIONS and make the cheapest test a precondition.
3. **Unanimity check.** If every seat's top option is the same and their scores for it sit within 1 point in Round 1, the Chair names the strongest unargued alternative as a crux in Round 2 and asks the seats whose pillars are most at risk to argue it at full strength.

## Spread and confidence

- `spread` = highest minus lowest seat score on the recommended option.
- `council confidence` = average seat confidence x 2, rounded, minus 1 if the spread is 5 or more. Scale 1 to 10.
- Report both. A 7.0 with spread 1 is a different answer from a 7.0 with spread 6.

## Pillar scorecard

One column per seat: its final PILLAR SCORE, which is that seat's judgment of the recommended option on its own pillar alone. Any pillar at 4 or below gets a named fix in "What to do next", even when the verdict is GO.

| Pillar | Dimension label |
|---|---|
| Strategy and scale (Sandberg) | Strategic fit and scalability |
| Offers, pricing, and sales (Hormozi) | Offer strength and unit economics |
| Product and customers (Kern Lima) | Customer demand and founder conviction |
| Audience, trust, and purpose (Oprah) | Audience trust and alignment |
| Marketing and attention (Gary V) | Attention and distribution |
| Operations, hiring, and team (Leila) | Team capacity and operational readiness |
| Founder energy and sustainability (Huffington) | Founder sustainability |
| Money, cash flow, and ownership (Codie) | Cash flow, downside, and ownership |
