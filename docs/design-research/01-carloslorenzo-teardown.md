# 01 · carloslorenzo.dev teardown

The primary reference. Captured 2026-10-16 from the live site (rendered DOM, shipped CSS, screenshots in `img/cl-*.jpg`).
Stack: Astro + a React island (`#root`), CSS Modules, Font Awesome icons, one `<canvas>` hero visual.

**Why it matters for us:** same profile shape as Kamrul (embedded + ML engineer, student, hardware projects).
It proves a site can feel like a *tool* (editor/terminal) while staying readable prose-first.

---

## 1. The one idea

> **The whole page is a source file open in an editor.**

Everything follows from that single metaphor, and nothing breaks it:

| Editor concept | How it shows up |
|---|---|
| Line-number gutter | `.rail` — 01…153 numbers down the left, 24px line height, 50% opacity, `pointer-events:none` |
| Active scope / indent guide | `.spine` — 2px left border per section, turns the section's accent color when in view (`[data-active=true]`) |
| File/tab name | `.win__t` — italic micro label notched into a box border (`wavelet.py`, `core`) |
| Path | `.path` — `~/projects/neurodaq` with a faint `~` |
| Git log | Experience entries: `* [HEAD]` current job, `* [main]` previous |
| Tree output | `└─` / `├─` connectors for bullets (`.tree`, `.t-tree`) |
| Prompt | Primary button prefixed with `❯` in accent |
| Syntax colors | Each section/category owns one hue from a 7-color "theme" |

Lesson: **pick one metaphor and commit to it at every scale** (page, section, card, tag, button). Half-committed themes look like costumes.

---

## 2. Tokens (verbatim from their CSS)

```css
:root{
  /* surfaces — 4 steps, all blue-black, never pure #000 */
  --bg:#0d0e12; --bg-raised:#13151d; --bg-inset:#0a0b0f; --bg-hover:#181b25;
  /* lines — 3 steps */
  --line:#1e2130; --border:#262a3a; --border-hi:#343a4f;
  /* text — 3 steps */
  --fg:#e2e8f0; --fg-dim:#9aa5b8; --fg-faint:#6d7ba1;
  /* "syntax" accents — pastel, similar lightness so none dominates */
  --pink:#f26fbb; --cyan:#79dcef; --purple:#b088f0; --green:#5fd97f;
  --yellow:#e8ef94; --orange:#f0ad6a; --red:#f05f5f;
  --accent:var(--purple);              /* re-assigned per section */

  --font-mono:"Iosevka",ui-monospace,"SF Mono",Menlo,monospace;
  --font-prose:"Iosevka Aile",var(--font-mono);   /* quasi-proportional sibling */

  /* type — small, tight scale; h2 == body size (hierarchy via style, not size) */
  --t-micro:.6875rem; --t-small:.8125rem; --t-body:.9375rem;
  --t-lead:1.0625rem; --t-h2:.9375rem; --t-h1:1.625rem;
  --track:.08em; --measure:68ch; --line-height-base:1.65;

  --radius:10px; --radius-sm:3px;
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:20px;
  --space-5:32px; --space-6:52px; --space-7:84px;   /* 64/104 at ≥1200px */

  --rail-line-h:24px; --rail-w:3.25rem; --spine-w:2px;
}
body{ background-image:radial-gradient(rgba(255,255,255,.016) 1px,transparent 0);
      background-size:3px 3px; background-attachment:fixed; } /* barely-there dot screen */
```

Observations worth stealing:
- **h1 is only 26px. h2 is the same size as body (15px).** Hierarchy comes from *italic + color + rules*, not scale. That's what makes it feel like code, not a landing page.
- **Two fonts from one family** (Iosevka mono for UI/labels, Iosevka Aile for prose). Same skeleton, different widths → cohesive without being monotonous. Equivalent pairs: *JetBrains Mono + Inter*, *Berkeley Mono + Berkeley Grotesk-ish*, *IBM Plex Mono + IBM Plex Sans*, *Geist Mono + Geist*, *Commit Mono + Atkinson*.
- Accent palette is **pastel, equal-lightness** → no hue screams; color reads as *category*, not *importance*.
- Focus ring: `0 0 0 2px var(--bg), 0 0 0 4px var(--cyan)` (gap ring). Selection: purple at 30% via `color-mix`.

---

## 3. Page skeleton

```
┌ shell (max 1080, centered) ───────────────────────────────────────┐
│ rail │ col (margin-left: rail-w)                                   │
│ 01   │ HERO  (min-height 100svh, 2-col: identity | 460px canvas)  │
│ 02   │ ┃ spine(about, purple)  —— about ─────────────────────     │
│ ..   │ ┃   prose (68ch)                     [core] kv box        │
│      │ ┃ spine(experience, green) —— experience ─────────────     │
│      │ ┃   git-log entries                                        │
│      │ ┃ spine(stack, yellow)   —— stack ──────────────           │
│      │ ┃   label | chip row (×4, hairline separated)              │
│      │ ┃ spine(projects, cyan)  —— projects ─────────────         │
│      │ ┃   card grid auto-fill minmax(280px,1fr)                  │
│      │ ┃ spine(contact, pink)   —— contact ──────────            │
│      │ ┃   blurb · [email copy] · icons · © line                  │
└──────┴─────────────────────────────────────────────────────────────┘
mobile ≤880px: rail hidden, spine stays, fixed bottom .actions bar (blurred)
```

Section color map: hero=pink, about=purple, experience=green, stack=yellow, projects=cyan, contact=pink. **The spine is the only thing that changes when you scroll** — a quiet, continuous "you are here".

---

## 4. Components (recipe-level)

### Hero
- 2-col grid `minmax(0,1fr) minmax(0,460px)`, gap 84px; collapses at 880px.
- Left: tiny ASCII-art logo (8px mono, faint) + `~/portfolio` path + h1 name + tagline (Aile, dim, 46ch).
- **Key/value spec list** (`.kv`): `Role: / Team: / Study: / Focus: / Base:` — keys bold-italic in accent, values plain. A résumé in 5 lines.
- CTA row: `❯ explore` (primary = pink-tinted border, pink chevron), `read the blog` (neutral), then 34px icon buttons with **CSS tooltip from `data-tip`** (micro uppercase, bordered).
- Right: titled window `wavelet.py` containing a canvas (particle/wavelet cloud, radial mask fades edges). The visual *is a piece of their domain* (signal processing), not decoration.
- Entrance: one `rise` keyframe (opacity 0→1, translateY 10px→0, .5s ease-out). That's the only page-load motion.

### Section heading — `.t-rule`
```css
.t-rule{display:grid;grid-template-columns:1.5rem auto 1fr;align-items:center;gap:.6rem;
  font:italic 400 var(--t-h2)/1 var(--font-mono);letter-spacing:var(--track);color:var(--accent)}
.t-rule::before,.t-rule::after{content:"";height:1px;background:var(--line)}
```
→ `—— about ───────────────`. Lowercase, italic, small. Sub-levels: `.t-bar` (3px accent bar + bold italic, used for "Hi, I'm Carlos :)") and `.t-tree` (`└─ label`).

### Titled window — `.win--titled`
Box (`bg-raised`, 1px border, 10px radius) with a label **notched into the top border** (absolute, translateY(-50%), background = page bg). Optional right-side status `.win__s` with a green 6px dot. Used for the hero canvas and the `core` kv card.

### Experience — git log
```
* [HEAD]  Hardware & Embedded Engineer                 2025 — PRESENT
DAIDALONIC   (italic, faint)
├─ bullet (Aile, dim, 68ch)
├─ bullet
└─ bullet
```
`.tree` draws the connectors with `::before`/`::after` 1px lines at 55% accent opacity; last item's vertical line stops at the text midline. Date: micro uppercase tracked, right-aligned, wraps under on mobile.

### Stack rows
Grid `9.5rem | 1fr`, hairline between rows. Label bold-italic in a per-row `--cat` color. Items = small bordered chips (icon tinted `--cat` + text dim).

### Project cards
`.win` + `auto-fill minmax(280px,1fr)`, gap 12px. Inside: `~/projects/slug` (micro, purple) → bold title → Aile description (small, dim) → tags pushed to bottom (`margin-top:auto`) → icon links.
Whole card clickable via stretched `::after` on title link; secondary links sit above with `z-index:1`. Hover: border → accent, bg → `--bg-hover`, title → accent.

### Tags
`1px solid color-mix(currentColor 40%, transparent)`, 3px radius, micro uppercase tracked. Color = domain: `--hw` cyan, `--sys` green, `--ml` purple, `--web` pink, `--misc` yellow.

### Contact
Lead blurb → **email button that copies on click** (`[data-copied]` turns border/text green; text swap uses a stacked grid with an invisible sizer so width doesn't jump) → icon row → hairline → `© 2026 NAME` micro uppercase.

### Mobile
Rail removed; spine kept with smaller padding. **Fixed bottom action bar** (52px + safe-area, 94% bg + `backdrop-filter: blur(10px)`, icon+micro label buttons, 44px min tap target).

---

## 5. Motion & interaction budget
- Page: one `rise` on hero. Spine border-color transition .3s. Hovers .14s color/bg/border only.
- No scroll-jacking, no parallax, no cursor effects. `prefers-reduced-motion` kills everything.
- The canvas is the single "wow" element, and it's on-theme.

## 6. Voice
- Lowercase section names, first-person, warm (`Hi, I'm Carlos :)`), concrete numbers in bullets (`+99%`, `1100V/V`, `3-day → 30 minutes`).
- Bold only on the domain nouns you want skimmed (`EEG`, `neurotechnology`).

## 7. What to take vs. not

**Take**
- One metaphor, fully committed. The rail + spine combo is cheap (pure CSS, ~30 lines) and carries the whole identity.
- Style-based hierarchy (italic/color/rules) instead of big type.
- kv spec list in the hero; git-log experience; path-labelled cards; copy-email button.
- Per-section accent re-assignment (`--accent` scoped per section).

**Don't copy literally**
- Iosevka + this exact pastel palette + `wavelet.py` would read as a clone. Swap: font family, palette, and the hero artifact (ours should be *our* domain — e.g. a live tokens/sec meter, an OLED/SH1106 128×64 pixel display rendering, a quantization bit-grid).
- The `[HEAD]/[main]` joke works once; find our own equivalent if we want a different metaphor (see `03-patterns.md`).

## 8. Mapping to Kamrul's data (`src/data/resume.ts`)
| Theirs | Ours |
|---|---|
| `Role / Team / Study / Focus / Base` kv | `Role: AI Eng · Embedded` / `Now: Version3.ai` / `Study: CSE @ BUET` / `Focus: on-device LLMs` / `Base: Dhaka, BD` |
| `wavelet.py` canvas | `sh1106.c` — a 128×64 1-bit canvas showing a tiny animation or live text, i.e. the thing he's building |
| `core` kv card | `now` list from `about.now` |
| git-log experience | Version3.ai = `[HEAD]`, Edulytics = previous commit |
| `~/projects/slug` cards | `projects[]` with `featured` first |
| tag domains hw/sys/ml/web | `ml` / `embedded` / `backend` / `research` |
