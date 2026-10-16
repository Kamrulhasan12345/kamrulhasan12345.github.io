# 03 · Taste principles & directions

Distilled from ~110 live sites + ~20 Dribbble shots (`02-references.md`, `04-dribbble.md`) and the carloslorenzo.dev teardown (`01`).
This is the file to re-read before any UI decision.

---

## Part 1 — What the good ones have in common

These held across *every* family (personal sites, explainers, dev tools, hardware brands, labs). The bad ones break them.

1. **One metaphor, fully committed.**
   carloslorenzo = source file. robinrendle = Finder. tamino = `main.js`. Low-Tech Mag = solar server. U.S. Graphics = engineering catalog. Lynn Fisher = book TOC.
   The metaphor shows up at every scale — page, section heading, card, tag, button. Half-committed = costume.

2. **Hierarchy through style, not size.**
   Carlos's h2 = body size. Paco, Emil, Benji, frankchimero use ~13–15px for everything.
   Italic, weight, color, rules, indentation, and position carry rank. Big type is used **once** (or never).

3. **Density is respect.**
   PlanetScale, Gwern, tinybox, Physical Intelligence, U.S. Graphics: lots of real information per screen, small type, hairlines.
   U.S. Graphics puts it as "Dense, not sparse." Dribbble does the opposite: one sentence + a headshot per viewport.

4. **Expose the machine.**
   Low-Tech Mag shows page weight and battery. tinybox shows noise in dB with a warning. Bun shows its benchmark in the hero. Are.na counts days. Oxide captions figures.
   For an efficiency engineer this is *the* move: the site should report on itself (build size, page weight, build time, commit hash, last deploy).

5. **The hero artifact is a working piece of your domain.**
   Carlos: `wavelet.py` (signal processing). Ciechanowski: draggable physics. Bun: a benchmark. Ghostty: its own renderer in ASCII. Railway: its product.
   Never a stock 3D blob, gradient orb, or headshot cut-out.

6. **Metadata as structure.**
   `~/projects/slug` paths, `FIG. 1` captions, `DATE / CATEGORY / DETAILS` kv tables, spec tables, `[HEAD]`/`[main]` refs, `Title / Essay / 2025`. Labels make dense content scannable.

7. **Color = category, not decoration.**
   Carlos's pastels are equal-lightness so they read as "type of thing". PlanetScale: one link color. Astral/TigerBeetle: one loud accent, used for one action.
   Rule: ≤1 accent per section, and it means something (domain, state, or the primary action).

8. **One family, two widths.** Iosevka + Iosevka Aile; Geist + Geist Mono; Plex Sans + Plex Mono; Berkeley Mono + its grotesk. Mono for labels/meta/UI, a proportional sibling for prose. Serif-italic as a *third* voice only for a single headline (Zed, Thinking Machines).

9. **Motion budget ≈ 1.** Carlos: one `rise` on load + hover color. Rauno: one scroll gimmick. The animated thing should be the hero artifact; everything else is 120–150ms color/border transitions. `prefers-reduced-motion` honored.

10. **Lists beat cards.** The strongest personal sites are lists (title + 1 line + date). Cards only when there's a real image or a spec table to hold.

## Part 2 — Anti-patterns (do not ship)

- Headshot cut-out with glow, "Hi, I'm X 👋 Full-Stack Developer", stat counters (`10+ projects`).
- Skill bars / percentages. Tech-logo clouds without context.
- Gradient blobs, glassmorphism cards, neon rim light, particles that aren't *your* data.
- Watermark giant text behind sections.
- Fake terminals you must type into to read content (m4tt72) — fine as an easter egg (`⌘K`), never as the only nav.
- Scroll-jacking, cursor followers, preloaders longer than the content takes to load.
- Every section a different layout "to keep it interesting".
- Copying carloslorenzo.dev's exact font + palette + `wavelet.py` (reads as a clone).

## Part 3 — Three directions for kamrulhasan12345

All three keep Carlos's skeleton (rail + spine, kv hero, git-log experience, path-labelled projects). They differ in **metaphor, type, palette, and hero artifact**. Pick one; don't blend.

### Direction A — `datasheet` (recommended)
*The site is a component datasheet for a person.*
- **Metaphor:** IC datasheet / U.S. Graphics catalog / tinybox spec sheet. Sections are datasheet sections: `1 FEATURES`, `2 APPLICATIONS`, `3 ELECTRICAL CHARACTERISTICS` (experience), `4 TYPICAL APPLICATIONS` (projects), `5 PACKAGE INFORMATION` (contact).
- **Hero:** part-number header `MKH-12345 · AI/Embedded Engineer · Rev 2026.10` + a pinout diagram of the "chip" (pins = skills/links), + kv spec table (`Supply: BUET CSE`, `Operating location: Dhaka`, `Status: ● active @ Version3.ai`).
- **Proof:** Bun-style benchmark block: `llama.cpp decode, Pixel ×  →  2.2–2.6×` drawn as bars; tinybox-style spec rows with honest caveats.
- **Type:** Berkeley Mono / JetBrains Mono for everything + IBM Plex Sans (or Inter) for long prose. Small caps micro labels with `--track:.08em`.
- **Palette:** paper-white or ink-black + **one** signal accent (amber `#f4b740` or Flipper orange `#ff8200`) + a "pin" green for live status. Figure captions `FIG. 3` everywhere.
- **Why it fits:** embedded + efficiency + research; makes "expose the machine" literal; clearly distinct from Carlos.

### Direction B — `editor` (closest to Carlos)
*The site is a file open in an editor — but our editor.*
- **Metaphor:** source file with gutter + scope spine (as Carlos), but file is `kamrul.c` (C, not Python), with `#include` style section headers and `/* */` comment blocks for prose labels.
- **Hero:** titled window `sh1106.c` rendering a 128×64 **1-bit OLED canvas** (pixel-doubled, phosphor or white-on-black) that types the intro text or plays a tiny animation — the thing he's actually building.
- **Experience:** git log (`* [HEAD] Version3.ai`, `* a3f9c1e Edulytics`). Projects: `~/src/llama-android/` with `make` badges.
- **Type:** keep the current repo's mono (JetBrains Mono) + a proportional sibling; drop Silkscreen except inside the OLED.
- **Palette:** keep the existing phosphor tokens in `src/styles/tokens.css` but make accents equal-lightness and assign one per section (spine color).
- **Why it fits:** lowest migration cost from the current `minimal-redesign` branch; still personal via the OLED hero.

### Direction C — `lab notebook`
*The site is a research log.*
- **Metaphor:** Physical Intelligence / Transformer Circuits / Distill: cream paper, serif titles, mono body, month column on the left, figures with captions.
- **Hero:** one-line serif statement + a live figure (tokens/s vs. threads, or a quantization error heatmap) rendered from real benchmark JSON.
- **Lists:** every project/post as an entry: `MAR 2026 │ Title │ 1-line finding │ fig thumbnail`; best 3 entries get a double border (PI).
- **Type:** Newsreader/Source Serif for titles, Berkeley/JetBrains Mono for body, tiny caps for dates.
- **Palette:** `#f4f1ea` paper, `#1a1a1a` ink, one ink-blue link color, one red for "new".
- **Why it fits:** emphasizes research + writing; ages well; least "dev-portfolio-y".

## Part 4 — Decision checklist (use before merging any UI)

- [ ] Can I name the metaphor in two words, and does this component express it?
- [ ] Is anything bigger than it needs to be? (Only the name may exceed 26px.)
- [ ] Does every color mean something?
- [ ] Is there a number/metadata label where a vague word would be?
- [ ] Would this exact component appear on a Dribbble template? If yes, redo.
- [ ] Does it work at 360px with no horizontal scroll, and with `prefers-reduced-motion`?
- [ ] Did I take more than one move from a single reference site? If yes, drop one.
