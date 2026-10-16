# Design research — UI inspiration

Research done 2026-10-16 for the portfolio redesign. Primary reference: **[carloslorenzo.dev](https://carloslorenzo.dev)**.
Scope: ~115 live sites across 10 families + Dribbble (11 searches, ~200 thumbnails, 19 shots opened). All captured in a real browser at 1440×900.

## Start here: pick your design system

**[Identity Picker](https://claude.ai/artifact/8i9zPaVb7mFBHw8sD5iGVQ)** — 15 categories, 109 options, each with 1–2 real-site screenshots (129 references total), a live preview of the homepage that re-skins as you pick, closest-reference matching, and **Save picks** (stored with the artifact so Claude can read them back and build from them). Source in `picker/`, method in `06-taxonomy.md`.

## Read in this order

| File | What it gives you | When to open it |
|---|---|---|
| [06-taxonomy.md](06-taxonomy.md) | All 15 categories × options with the best example sites, and how they were classified (Amos vision + text, hand-reviewed) | Picking a direction without the picker |
| [03-principles.md](03-principles.md) | 10 taste rules, anti-patterns, **3 directions** (datasheet / editor / lab notebook), pre-merge checklist | Before any UI decision |
| [01-carloslorenzo-teardown.md](01-carloslorenzo-teardown.md) | Full teardown: real tokens, skeleton, every component with CSS recipe, mapping to `src/data/resume.ts` | Building the page skeleton |
| [05-patterns.md](05-patterns.md) | ~45 patterns with source, where it goes, how to build, tier 1–3 | Building a specific component |
| [02-references.md](02-references.md) | Catalog of ~115 sites, one "move to steal" each, ★ = most relevant | Looking for an alternative to a pattern |
| [04-dribbble.md](04-dribbble.md) | Dribbble verdict + 11 shots worth keeping | Rarely — Dribbble is low signal here |

## Images

`img/` — downscaled screenshots (640px wide, 2 viewports stacked):
- `cl-00…04.jpg` — carloslorenzo.dev, full page in 5 viewports (1200px)
- `ref-<family><nn>-<site>.jpg` — every reference site (families a–j match sections in `02-references.md`)
- `dr<nn>-*.jpg` — Dribbble shots

## TL;DR

1. One metaphor, committed at every scale. Carlos = source file; ours should be our own (recommended: **datasheet**).
2. Hierarchy through italic/color/rules, not size. Body ~15px, h1 ≤ 26px except the name.
3. Dense, small, list-first. Cards only for spec tables or real images.
4. The hero artifact is a working piece of the domain (candidate: `sh1106.c` 128×64 OLED canvas, or a Bun-style benchmark).
5. Expose the machine: figure captions, spec tables with honest caveats, page weight/build hash in the footer.
6. Color = category. ≤ 1 accent per section.
7. Motion budget ≈ 1.

## How this was captured (to redo or extend)

Visible Chromium with a throwaway profile and remote debugging on `:9333`, driven by a ~40-line Node CDP script (navigate → scroll → `Page.captureScreenshot`), 2 windows in parallel, `magick` for contact sheets. Sites behind bot checks (frame.work) were skipped.
