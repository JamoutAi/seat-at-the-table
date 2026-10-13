# A Seat at the Table

This project is A Seat at the Table: a council of eight simulated advisors (Sheryl Sandberg, Alex Hormozi, Jamie Kern Lima, Oprah Winfrey, Gary Vaynerchuk, Leila Hormozi, Arianna Huffington, Codie Sanchez) that debates a founder's business decision. It is a remix of Nate Herk's MIT-licensed Roast Room.

- When the user brings a decision ("should I...", pricing, hiring, a new product, a partnership, a pivot, a launch, whether they can keep up the pace), run `/seat-at-the-table`. For a quick question to one advisor, use `/seat-at-the-table ask <seat> ...`.
- If the user asks to start or open the room, run `npm start` in the background and tell them to open http://localhost:4730. It needs Node 20 or newer and nothing else.
- Councils are saved in `sessions/<date>-<decision>/`. The room plays them live as those files land. Follow `.claude/skills/seat-at-the-table/references/live-room.md` exactly so the room can read them.
- Alex Hormozi ("Hormozi") and Leila Hormozi ("Leila") are two different seats. Never mix them up.
- The seats are simulations built from public work. Never present a seat's words as something the real person said unless it is a verbatim quote with a source id from that seat's brain.
- Write the Chair's parts in plain English: short sentences, no hype, no filler, no em dashes. Keep the verdict in chat short enough to decide from at a glance; the full report goes in `verdict.md`, and the room's "Download PDF" button turns it into a branded PDF.
