# 05 · Pattern library

Every reusable move found in the research, mapped to where it fits on Kamrul's site and how to build it cheaply (CSS-first, Astro, no new deps).
**Tier** = how strongly recommended: **1** use it · **2** good if it fits the chosen direction · **3** easter egg / only with a strong reason.

## Page structure

| # | Pattern | Sources | Our use | Build note | Tier |
|---|---|---|---|---|---|
| P1 | Line-number rail + scope spine (spine color = active section) | carloslorenzo | Whole homepage | `.rail` absolutely positioned column of `<span>`s (count = `Math.ceil(height/24)` at build or via one `ResizeObserver`); `.spine{border-left:2px solid}` + `IntersectionObserver` toggling `data-active` | 1 (Dir B) |
| P2 | Ruler ticks in the margin as scroll/position indicator | rauno, stripe press, devouringdetails | Left edge (Dir A) | `repeating-linear-gradient` 1px ticks every 8px, longer every 40px; a marker positioned by scroll % | 2 |
| P3 | Sticky identity column + scrolling content | brittanychiang, delba | Desktop ≥1024px | `grid-template-columns: 22rem 1fr; .id{position:sticky;top:0;height:100svh}` | 2 |
| P4 | Visible layout grid lines / crosshair corners | zed, geist, etched, warp | Section frames (Dir A) | `outline` on grid cells + `::before` `+` glyphs at corners | 2 |
| P5 | Mobile fixed bottom action bar | carloslorenzo | ≤880px | blur bar, 4 actions (home/projects/writing/contact), 44px targets, safe-area padding | 1 |
| P6 | TOC nav with dot leaders + numerals | lynnandtonic | Section nav or footer sitemap (Dir A) | `display:flex` + `flex:1; border-bottom:1px dotted` filler | 2 |
| P7 | Datasheet section numbering `1 FEATURES` | U.S. Graphics, tinybox | All section heads (Dir A) | micro caps + tabular number | 1 (Dir A) |

## Headings & labels

| # | Pattern | Sources | Our use | Build note | Tier |
|---|---|---|---|---|---|
| H1 | `—— about ─────` italic lowercase rule heading | carloslorenzo | Section heads (Dir B) | grid `1.5rem auto 1fr` + `::before/::after` hairlines | 1 (Dir B) |
| H2 | `FIG. 3  caption` on every visual | oxide, linear, warp | Every image/chart | `<figure>` + `figcaption` micro caps; auto-number with CSS `counter()` | 1 |
| H3 | `~/projects/slug` path above titles | carloslorenzo, robinrendle | Project cards, post headers | `.path::before{content:"~"}` | 1 |
| H4 | Type/year inline after title: `Title / Essay / 2025` | aresluna | Writing list | dim `/` separators | 1 |
| H5 | Italic run-in heads in prose | thinkingmachines | About text, long posts | `<p><em>Lead.</em> text</p>` | 2 |
| H6 | Status chips `● active` / maturity icons | maggieappleton, jhey, carlos `.pip` | Projects (prototype/shipped/maintained) | 6px dot + label; color = state | 1 |

## Hero

| # | Pattern | Sources | Our use | Build note | Tier |
|---|---|---|---|---|---|
| R1 | kv spec list (`Role: / Now: / Study: / Focus: / Base:`) | carloslorenzo, MLC, anthropic | Hero | `<dl class="kv">` grid `auto 1fr`; dt bold-italic accent | 1 |
| R2 | Domain artifact in a titled window | carloslorenzo `wavelet.py`, ciechanowski, ghostty | Hero right column | `.win--titled` + `<canvas>`; candidates below | 1 |
| R3 | Benchmark-as-hero bars | bun.sh, tigerbeetle | Hero or first project | pure HTML/CSS bars from `resume.ts` numbers; tabular nums; "lower is better" note | 1 |
| R4 | ASCII rendering of a shape via density ramp | ghostty, play.ertdfgcvb | Alt hero artifact | `<pre>` + rAF loop, ramp ` .:-=+*#%@`, ~60×24 chars | 2 |
| R5 | Part-number header `MKH-12345 · Rev 2026.10` | datasheets, raspberrypi boxed `[5]` | Hero top line (Dir A) | mono micro caps; rev = build date | 2 |
| R6 | Live age/uptime counter | are.na, terminal-ui shot | Footer or hero | `x years and n days` computed at build (no JS) | 2 |
| R7 | Sentence-builder filter `I make [LLMs▾] run on [phones▾]` | pentagram | Projects page filter | two `<select>`s filtering `data-*` attrs | 3 |

**Hero artifact candidates (pick one, R2):**
1. `sh1106.c` — 128×64 1-bit OLED canvas (pixel-doubled ×3 = 384×192), typing the intro or a tiny animation. Ties to his current ESP32-S3 driver work. *Recommended.*
2. `bench.json` — live bar race replaying the llama.cpp Android speedup (Bun pattern).
3. `quant.py` — a weight-matrix heatmap that re-quantizes (fp16 → q8 → q4) on a slider, showing error (Ciechanowski pattern).
4. `graph.json` — force graph of his projects/skills (Obsidian pattern; data from `graphify-out/`).

## Lists, cards, entries

| # | Pattern | Sources | Our use | Build note | Tier |
|---|---|---|---|---|---|
| L1 | Git-log experience `* [HEAD] role` + `├─` bullets | carloslorenzo | Experience | `.tree` connectors via `::before/::after` | 1 (Dir B) |
| L2 | Org-logo timeline | karpathy | Experience (Dir C) | 32px logos in a left column | 2 |
| L3 | Year column only on first row of a year | benji, transformer-circuits | Writing/projects archive | `{i===0||y!==prev.y ? y : ""}` in Astro | 1 |
| L4 | Project card: path → title → desc → tags (pushed down) → icon links; stretched link | carloslorenzo | Projects grid | `margin-top:auto` on tags; `::after{inset:0}` on title link | 1 |
| L5 | Spec table inside card with honest caveats | tinybox, anthropic | Project detail pages | `<dl>` rows: Target / Model / Speedup / Power / Caveat (orange) | 1 |
| L6 | Highlight top items with heavier border instead of a "featured" section | physicalintelligence | Projects list | `.featured{outline:3px double}` | 2 |
| L7 | Stack rows: italic category label │ chip row | carloslorenzo | Skills | grid `9.5rem 1fr`, hairline between rows | 1 |
| L8 | Inline logo chips in prose ("Creator of ⓥ Vitest") | antfu | About paragraph | 16px icon + text inline-flex | 2 |
| L9 | Code panel + its output side by side | ziglang | Driver/benchmark posts | two `<pre>`; output in dim with `$` prompt | 1 |
| L10 | Group work by verb: run / read / watch | ncase | Projects page sections | — | 2 |
| L11 | Diagram-as-thumbnail | colah, distill | Post cards | small SVG per post | 2 |

## Tags, buttons, small UI

| # | Pattern | Sources | Our use | Build note | Tier |
|---|---|---|---|---|---|
| U1 | Outline micro-caps tag colored by domain (`ml`/`embedded`/`backend`/`research`) | carloslorenzo | Everywhere | `border:1px solid color-mix(in srgb,currentColor 40%,transparent)` | 1 |
| U2 | Primary button prefixed with `❯` in accent | carloslorenzo | Hero CTA | — | 1 (Dir B) |
| U3 | Icon buttons with CSS tooltip from `data-tip` | carloslorenzo | Social links | `::after{content:attr(data-tip)}` | 1 |
| U4 | Copy-email button that turns green "copied" | carloslorenzo | Contact | `navigator.clipboard` + `[data-copied]`; invisible sizer to stop width jump | 1 |
| U5 | Boxed tab nav with status dot + offset shadow | U.S. Graphics | Top nav (Dir A) | `box-shadow:2px 2px 0 var(--ink)` | 2 |
| U6 | `⌘K` command palette as the *secondary* nav | dribbble command-search, terminal-ui | Global | `<dialog>` + filtered list; Esc closes | 3 |
| U7 | Highlight-block bio text (selection style) | dribbble "Shipped" | One hero sentence | `background:var(--accent); color:var(--bg)` on inline spans, `box-decoration-break:clone` | 2 |

## Texture & imagery

| # | Pattern | Sources | Our use | Build note | Tier |
|---|---|---|---|---|---|
| T1 | 3px dot-screen body background at ~1.6% | carloslorenzo | Body | `radial-gradient(rgba(255,255,255,.016) 1px,transparent 0) 0 0/3px 3px fixed` | 1 |
| T2 | Dithered / duotone images | lowtechmag, jzhao, 100r.co | All project photos | pre-dither at build (Floyd–Steinberg via `sharp` threshold or a one-off script), 2-color | 2 |
| T3 | 1-bit LCD/OLED illustrations | flipper, analogue, 100r.co | Project icons, 404 | 128×64 PNGs, `image-rendering:pixelated` | 1 |
| T4 | Pixel display type for **one** element | aresluna, astral, railway | Name or OLED only | keep Silkscreen (already in repo history) for that one place | 2 |
| T5 | Expose-the-machine footer: page weight, build hash, build time | lowtechmag | Footer | inject at build: `import.meta.env`, `git rev-parse --short HEAD`, dist size | 1 |
| T6 | Generative line art at ~5% behind content | antfu (plum tree), kasey chen shot | Hero background | single canvas, draws once, no loop | 3 |

## Motion

| # | Pattern | Sources | Build note | Tier |
|---|---|---|---|---|
| M1 | Single `rise` on hero (opacity + 10px, .5s) | carloslorenzo | CSS keyframes | 1 |
| M2 | Spine/accent color transition .3s on section enter | carloslorenzo | `transition:border-color .3s` | 1 |
| M3 | Hover = color/bg/border only, 120–150ms | everyone good | — | 1 |
| M4 | Everything off under `prefers-reduced-motion` | carloslorenzo | global `*{animation-duration:.001ms!important}` | 1 |
