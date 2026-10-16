# 04 · Dribbble sweep

Searched 2026-10-16: `developer portfolio dark`, `terminal portfolio`, `code editor portfolio`, `engineer portfolio monospace`,
plus broader taste searches: `ascii website`, `dot matrix ui`, `swiss style portfolio`, `brutalist portfolio website`,
`editorial personal website`, `pixel art website`, `technical hud interface`. ~200 thumbnails scanned, 19 shots opened.
Images: `img/dr<nn>-*.jpg` (the `dr03` etc. below match file names).

## Verdict first

Dribbble is **weak signal for this brief**. ~80% of "developer portfolio" shots are the same template:
headshot cut-out + gradient blob + "Hi, I'm X, Full-Stack Developer" + 3 stat counters + bento grid.
"Terminal" searches are swamped by crypto trading dashboards. Use Dribbble for **isolated moves**, never for a whole page.
Real shipped sites (`02-references.md`) are where taste lives.

**Anti-patterns Dribbble taught us (avoid):**
- Floating cut-out headshot with neon rim light.
- Stat counters (`10+ projects`, `3+ years`) — meaningless for a student; use concrete outcomes instead.
- Gradient-glow bento cards where every tile has equal weight.
- `{curly braces}` around a highlighted word in the hero.
- Skill progress bars (`React ████░ 80%`).
- Huge watermark text behind content (`ABOUT US` at 15% opacity).

## Shots worth keeping (ranked)

| # | Shot | The one move to steal |
|---|---|---|
| 1 | **Shipped — Engineer Portfolio & CV** (Oleksandr Demydov) `dr03` | Black page, single lime cursor block, bio set as **lime highlight-block mono text** (`background` on inline spans, like selected text in a terminal). CTA `SEE THE WORK` solid lime + `DOWNLOAD CV` outline. Extremely restrained; reads as "selected text". |
| 2 | **Tech Selected Builds** (KLSG.Design) `dr14` | Swiss layout: macro photo of a PCB beside a condensed bold grotesk headline `TECH SELECTED BUILDS`, mono meta line `CLIENT: ENTERPRISE · 2024–2026`. Hardware photography + type, no illustration. |
| 3 | **Terminal UI Portfolio** (Teo Choong Ching) `dr01` + search thumb | Full interactive shell: `$ /whoami`, `/links` → numbered quick-links, `/help` command list, status line `uptime: 4m 26s · cmds: 3 · heap: nominal`. Steal the **status line** and **slash-command palette**, not the full shell. |
| 4 | **Bittensor Command Search** `dr17` | ⌘K palette: recent items as tiles, grouped actions, keyboard hints right-aligned. Model for a site-wide `⌘K` jump menu. |
| 5 | **Developer Dark Grid** (Nicolas Meuzard) `dr13` | Talks/writing as a dark grid of text-only cells: event + date micro caps, big title, `Video ↗ Slides ↗`. Typography carries the grid; no thumbnails. |
| 6 | **Hypx trading terminal** `dr18` | Data density done right: tabular numerals, hairline grid, tiny caps labels, one accent (lime) for the single call-to-action. Reference for a "benchmarks" table (tokens/s, latency, recall@1). |
| 7 | **Software Engineer Portfolio** (Kasey Chen) `dr05` | Vertical rotated nav on the left edge; teal wireframe line-art (moiré rings) as hero texture. Line-art > blobs. |
| 8 | **MLC Mobile Portfolio** (Benek Lisefski) `dr07` | Mobile spec sheet: `LOCATION / COMPLETED / ARCHITECT …` two-column hairline table in mono. Same idea as Carlos's `.kv` — project metadata as a spec table. |
| 9 | **Tony Swan** (Emura) `dr10` | Brutalist B/W collage, binary digits as texture, huge grotesk name. Too loud for us, but **binary/bit texture** is relevant to quantization work. |
| 10 | **D.Oberoy editorial hero** `dr11` | Mixed serif-italic + grotesk headline, `/design /art direction /vibe coding` slash-tags. Slash-path labels again. |
| 11 | **Neon Terminal — Cyber Bento** `dr02` | Single giant monogram tile (`T`) inside a bento; `Available for projects` green pill. Only the monogram-tile idea is good. |

Broader-search notes (ascii / dot-matrix / swiss / brutalist / editorial / pixel / HUD) are in `02-references.md §J`.
