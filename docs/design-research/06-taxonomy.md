# 06 · Design taxonomy

Every design choice from the research, sorted into **15 categories / 109 options**, each option with its best real-site examples.
The interactive version, with screenshots, a live preview of your homepage and saved picks, is the **Identity Picker**:
https://claude.ai/artifact/8i9zPaVb7mFBHw8sD5iGVQ (source: `picker/`).

## How the examples were chosen

- **129 single-design references** (115 from the first sweep, carloslorenzo.dev, 13 gap-fill sites found by two search agents for options that had too few examples). Gallery pages and Dribbble search grids are excluded.
- Each site got two votes from the [Amos](https://amos.scira.ai/docs/) decision API:
  - `amos-1-small` looked at the two captured screens (it is the only Amos tier that reads images);
  - `amos-1-large` (most accurate tier) read the site's name, family and research notes.
- Votes are blended per category (`w_img` in `picker/tools/taxonomy.json`: ~0.8 for visual categories like surface and type, ~0.3 for conceptual ones like concept and motion).
- Every category's top examples were then reviewed by eye; corrections for **55 sites** are pinned in `picker/tools/overrides.json`. A single-pick option only lists sites whose top choice it is; a multi-pick option lists sites scoring ≥ 0.5.
- Rebuild: `python3 tools/build_sites.py <docs dir> && python3 tools/classify.py && python3 tools/aggregate.py && python3 tools/build_picker.py` (paths in the scripts assume the original job scratch layout; votes are cached per site).

Options with only 2 real examples (genuinely rare in the wild): duotone accent, key-value spec hero, boxed-tab nav, TOC-with-leaders nav, tree/git-log listing, heavy 3D.

## 01 · Core concept / metaphor (pick one)

_What overall metaphor or concept does this website's design express?_

| Option | What it means | Best examples |
|---|---|---|
| `editor` | styled like source code open in a code editor: line numbers, file names, syntax-colored labels | taminomartinius.de, carloslorenzo.dev, Dribbble dr06 |
| `terminal` | styled like a command-line terminal: prompts, ASCII banners, typed commands, monospace on dark | ryanancheta.com, portfolio-airil.vercel.app, gabx.io, term.m4tt72.com |
| `os_desktop` | styled like a desktop operating system or file browser: windows, icons, docks, file trees | robinrendle.com, os.ryo.lu, posthog.com, poolsuite.net |
| `datasheet` | styled like an engineering catalog or spec sheet: spec tables, figure captions, part numbers, technical rules | usgraphics.com, Dribbble dr07, tinygrad.org, devouringdetails.com |
| `lab_notebook` | styled like a research log or academic publication: dated entries, papers, figures, citations | asifuddin.com, distill.pub, transformer-circuits.pub, physicalintelligence.company |
| `editorial` | styled like a magazine: typography-led layout with large type and photography | Dribbble dr11, zoomie.github.io, studiofreight.com, wattenberger.com |
| `garden_index` | a minimal personal index or digital garden: plain lists of writing and projects, little decoration | emilkowal.ski, paco.me, rsms.me, benji.org |
| `product_landing` | a polished product marketing landing page: hero headline, product screenshots, logo walls, call-to-action buttons | Dribbble dr02, supabase.com, modal.com, ollama.com |
| `playground` | a playful toy, game or experimental playground with whimsical or interactive elements | neal.fun, ncase.me, joshwcomeau.com, redblobgames.com |
| `object_brand` | a physical hardware or object brand: device renders and product photography lead | analogue.co, play.date, daylightcomputer.com, flipperzero.one |
| `manual_book` | styled like a printed book or manual: table of contents, chapters, ornaments, numerals | eloquentjavascript.net, lynnandtonic.com, press.stripe.com, gwern.net |

## 02 · Surface / background (pick one)

_What is the dominant page background?_

| Option | What it means | Best examples |
|---|---|---|
| `ink_dark` | dark blue-black or dark navy | carloslorenzo.dev, brittanychiang.com, mitchellh.com, jzhao.xyz |
| `true_black` | pure or near-pure black | 100r.co, tigerbeetle.com, are.na, jhey.dev |
| `warm_dark` | dark brown, olive or warm charcoal | asifuddin.com, dawidesign.de, daylightcomputer.com, aresluna.org |
| `white` | clean white | emilkowal.ski, ollama.com, warp.dev, finnh.ca |
| `paper` | warm cream, beige or off-white paper | anthropic.com, transformer-circuits.pub, solar.lowtechmagazine.com, news.ycombinator.com |
| `grey_mid` | medium grey | analogue.co, play.date, frankchimero.com, rsms.me |
| `color_field` | a saturated color (purple, yellow, orange, blue...) | zoomie.github.io, charm.land, astral.sh |

## 03 · Color strategy (pick one)

_How is color used beyond the background and text?_

| Option | What it means | Best examples |
|---|---|---|
| `monochrome` | no accent color at all, only greys/black/white | finnh.ca, emilkowal.ski, are.na, frankchimero.com |
| `single_signal` | one accent color used sparingly for links, status or one button | rsms.me, mitchellh.com, matklad.github.io, devouringdetails.com |
| `category_pastels` | several soft accent colors of similar brightness, each marking a category or section | carloslorenzo.dev, mymind.com, vercel.com, andymatuschak.org |
| `neon_glow` | glowing neon colors, gradients and light effects | charm.land, sindresorhus.com, Dribbble dr12, Dribbble dr05 |
| `duotone` | a two-color printed feel (e.g. ink plus one spot color, tinted images) | asifuddin.com, solar.lowtechmagazine.com |
| `bold_brand` | large blocks of a strong saturated brand color | astral.sh, zoomie.github.io, play.date, rauno.me |
| `imagery_color` | color comes mainly from photos or illustrations, UI itself is neutral | os.ryo.lu, robinrendle.com, leerob.com, mntre.com |

## 04 · Type system (pick one)

_Which typeface system dominates the page?_

| Option | What it means | Best examples |
|---|---|---|
| `all_mono` | almost everything set in a monospace font | frankchimero.com, planetscale.com, taminomartinius.de, tinygrad.org |
| `mono_plus_sans` | monospace for labels and metadata plus a clean sans-serif for body or headlines | oxide.computer, warp.dev, carloslorenzo.dev, portfolio-airil.vercel.app |
| `serif_plus_mono` | serif headlines or body combined with monospace labels | jhey.dev, zed.dev, physicalintelligence.company, asifuddin.com |
| `serif_editorial` | serif typefaces lead the page, bookish or editorial | wattenberger.com, gwern.net, matklad.github.io, ineedmore.coffee |
| `grotesk_swiss` | neutral grotesque sans-serif (Helvetica/Inter-like), Swiss and clean | cosmos.so, ollama.com, emilkowal.ski, culturedcode.com |
| `condensed_display` | tall condensed bold display headlines | bun.sh, tigerbeetle.com, Dribbble dr14, zoomie.github.io |
| `pixel_bitmap` | pixel or bitmap display font visible | aresluna.org, ryanancheta.com, term.m4tt72.com |
| `rounded_playful` | rounded, chunky or hand-drawn playful lettering | neal.fun, play.date, panic.com, ncase.me |
| `system_plain` | plain default system or browser fonts, unstyled | fabiensanglard.net, os.ryo.lu, danluu.com |

## 05 · Type scale (pick one)

_How large is the typography overall?_

| Option | What it means | Best examples |
|---|---|---|
| `micro` | everything is small (body-size or smaller), quiet, no big headline | paco.me, frankchimero.com, danluu.com, emilkowal.ski |
| `moderate` | a modest headline, mostly normal-size text | distill.pub, delba.dev, blog.maximeheckel.com, ollama.com |
| `display` | a huge headline or name dominates the first screen | bun.sh, astral.sh, zoomie.github.io, Dribbble dr10 |

## 06 · Page skeleton (pick one)

_What is the page layout structure?_

| Option | What it means | Best examples |
|---|---|---|
| `narrow_column` | one narrow centered column of content | blog.maximeheckel.com, antfu.me, lynnandtonic.com, ineedmore.coffee |
| `sidebar_sticky` | a sidebar or a split layout with a fixed identity column beside scrolling content | brittanychiang.com, nan.fyi, joshwcomeau.com, delba.dev |
| `multi_column_index` | several text columns side by side forming an index | gwern.net, rsms.me, andymatuschak.org, paco.me |
| `card_grid` | a grid of cards, tiles or bento boxes | neal.fun, supabase.com, redblobgames.com, anthropic.com |
| `full_bleed_sections` | stacked full-width marketing sections | play.date, raspberrypi.com, flipperzero.one, tigerbeetle.com |
| `gutter_rail` | a code-editor style gutter or rail with line numbers or a vertical guide line on the left | carloslorenzo.dev, devouringdetails.com, zoomie.github.io, ryanancheta.com |
| `spatial_canvas` | a free spatial layout: horizontal scrolling, scattered items, desktop or canvas | studiofreight.com, os.ryo.lu, rauno.me, ia.net |

## 07 · Information density (pick one)

_How much information is packed into one screen?_

| Option | What it means | Best examples |
|---|---|---|
| `airy` | very little content per screen, lots of empty space | press.stripe.com, term.m4tt72.com, frankchimero.com, cosmos.so |
| `balanced` | a moderate amount of content with comfortable spacing | nan.fyi, Dribbble dr19, daylightcomputer.com, flipperzero.one |
| `dense` | a lot of text, links or data per screen, tight spacing | fabiensanglard.net, gwern.net, news.ycombinator.com, danluu.com |

## 08 · Hero (first screen) (pick one)

_What occupies the first screen (the hero)?_

| Option | What it means | Best examples |
|---|---|---|
| `text_intro` | a short text introduction or bio, no big visual | jakub.kr, mitchellh.com, samuelkraft.com, gwern.net |
| `kv_spec` | a key-value spec list or table about the person or product | carloslorenzo.dev, tinygrad.org |
| `statement_type` | one big typographic statement or name | zoomie.github.io, mymind.com, wattenberger.com, Dribbble dr10 |
| `product_visual` | a product screenshot, UI mockup or benchmark chart | bun.sh, Dribbble dr18, cursor.com, Dribbble dr17 |
| `interactive_artifact` | a live interactive canvas, simulation, animation or ASCII art piece | ciechanow.ski, modal.com, ghostty.org, play.ertdfgcvb.xyz |
| `photo_object` | a photograph or render of a physical object or place | etched.com, craigmod.com, analogue.co, os.ryo.lu |
| `illustration` | an illustration or drawn character | charm.land, 100r.co, tigerbeetle.com, fly.io |
| `terminal_prompt` | a terminal window or command prompt | ryanancheta.com, gabx.io, Dribbble dr01, term.m4tt72.com |
| `list_first` | no hero; the page opens straight into a list of entries | news.ycombinator.com, danluu.com, matklad.github.io, distill.pub |

## 09 · Navigation (pick one)

_What kind of navigation does the site use?_

| Option | What it means | Best examples |
|---|---|---|
| `top_minimal` | a minimal top bar with a few text links | brandur.org, studiofreight.com, ineedmore.coffee, tinygrad.org |
| `top_full` | a full product top navigation with menus and buttons | cursor.com, fly.io, zed.dev, supabase.com |
| `sidebar` | a vertical sidebar navigation | robinrendle.com, taniarascia.com, mitchellh.com, brittanychiang.com |
| `tabs_boxed` | boxed tabs or bordered buttons as navigation | usgraphics.com, gwern.net |
| `toc_leaders` | a table of contents with dot leaders or numerals | lynnandtonic.com, eloquentjavascript.net |
| `icon_labels` | navigation items with icons plus labels and small sub-labels | teenage.engineering, 100r.co, aresluna.org |
| `command_terminal` | typed commands, a command palette or terminal input | term.m4tt72.com, play.ertdfgcvb.xyz, gabx.io, taminomartinius.de |
| `inline_links` | links embedded in prose, no real navigation bar | carloslorenzo.dev, benji.org, danluu.com |

## 10 · How work is listed (pick any)

_How are projects, posts or entries presented?_

| Option | What it means | Best examples |
|---|---|---|
| `dated_list` | a simple list of titles with dates | ryanancheta.com, ineedmore.coffee, matklad.github.io, fabiensanglard.net |
| `year_table` | a table with a year or date column and rows | benji.org, karpathy.ai, brittanychiang.com, transformer-circuits.pub |
| `thumb_cards` | cards with thumbnail images | redblobgames.com, finnh.ca, distill.pub, learn.adafruit.com |
| `timeline` | a vertical timeline | karpathy.ai, zoomie.github.io, taniarascia.com |
| `tree_log` | a tree or git-log style structure with connector lines | carloslorenzo.dev, ryanancheta.com |
| `spec_table` | spec tables of key-value rows | usgraphics.com, anthropic.com, tinygrad.org, Dribbble dr07 |
| `tile_grid` | a grid of logo or icon tiles | usgraphics.com, neal.fun, planetscale.com, samuelkraft.com |
| `long_prose` | long paragraphs of prose | thinkingmachines.ai, blog.maximeheckel.com, ciechanow.ski, antfu.me |

## 11 · Section headings (pick one)

_How are section headings styled?_

| Option | What it means | Best examples |
|---|---|---|
| `rule_label` | a small label sitting on a thin horizontal rule line | carloslorenzo.dev, devouringdetails.com, brittanychiang.com, aresluna.org |
| `numbered` | numbered headings like 01. or 1 | lynnandtonic.com, portfolio-airil.vercel.app, dawidesign.de, news.ycombinator.com |
| `micro_caps` | tiny uppercase letter-spaced labels | transformer-circuits.pub, asifuddin.com, eloquentjavascript.net, wattenberger.com |
| `big_serif` | large serif headings | mymind.com, resend.com, studiofreight.com, maggieappleton.com |
| `big_sans` | large sans-serif headings | Dribbble dr10, Dribbble dr14, astral.sh, flipperzero.one |
| `figure_captions` | technical figure captions like FIG. 1 | linear.app, oxide.computer, warp.dev |
| `plain_bold` | plain bold text headings | fabiensanglard.net, rsms.me, matklad.github.io, emilkowal.ski |

## 12 · Texture & ornament (pick any)

_Which surface textures or ornaments are visible?_

| Option | What it means | Best examples |
|---|---|---|
| `flat` | completely flat, no texture or ornament | studiofreight.com, mntre.com, emilkowal.ski, frankchimero.com |
| `dot_grain` | a dot pattern, noise or grain on the background | carloslorenzo.dev, nothing.tech, lynnandtonic.com, solar.lowtechmagazine.com |
| `grid_lines` | visible grid lines, crosshairs or frame guides | jhey.dev, planetscale.com, vercel.com, dawidesign.de |
| `ticks_marks` | ruler ticks, registration or crop marks | devouringdetails.com, press.stripe.com, rauno.me |
| `dithered` | dithered or halftone images | portfolio-airil.vercel.app, finnh.ca, blog.maximeheckel.com, solar.lowtechmagazine.com |
| `scanline_crt` | CRT scanlines or glow | ryanancheta.com, portfolio-airil.vercel.app, blog.maximeheckel.com, ghostty.org |
| `line_art` | thin line art, wireframes or generative lines | Dribbble dr05, asifuddin.com, antfu.me, nan.fyi |
| `glow_gradient` | soft gradients, glows or light streaks | charm.land, raycast.com, tigerbeetle.com, sindresorhus.com |
| `ascii_texture` | ASCII characters used as image or texture | charm.land, play.ertdfgcvb.xyz, portfolio-airil.vercel.app, ghostty.org |
| `boxes_borders` | bordered boxes, outlines or offset shadows | carloslorenzo.dev, usgraphics.com, physicalintelligence.company, lilianweng.github.io |

## 13 · Imagery (pick any)

_What kinds of images appear?_

| Option | What it means | Best examples |
|---|---|---|
| `no_images` | no images at all, text only | emilkowal.ski, paco.me, rsms.me, lynnandtonic.com |
| `ui_screenshots` | software UI screenshots | railway.com, linear.app, cursor.com, Dribbble dr17 |
| `product_photos` | photos of physical products or objects | flipperzero.one, finnh.ca, jeffgeerling.com, etched.com |
| `people_photos` | photos of people or portraits | karpathy.ai, portfolio-airil.vercel.app, dawidesign.de, zoomie.github.io |
| `illustration` | illustrations or drawn characters | neal.fun, fly.io, leerob.com, tigerbeetle.com |
| `pixel_art` | pixel art or 1-bit graphics | railway.com, flipperzero.one, portfolio-airil.vercel.app, finnh.ca |
| `diagrams` | diagrams, charts or scientific figures | asifuddin.com, redblobgames.com, colah.github.io, distill.pub |
| `logo_walls` | walls of company logos | ollama.com, planetscale.com, supabase.com, usgraphics.com |
| `renders_3d` | 3D renders | raspberrypi.com, joshwcomeau.com, play.date, oxide.computer |

## 14 · Motion & interactivity (pick one)

_How much motion and interactivity does the site rely on?_

| Option | What it means | Best examples |
|---|---|---|
| `static` | static page, nothing moves | danluu.com, fabiensanglard.net, benji.org, matklad.github.io |
| `hover_only` | only subtle hover effects | brittanychiang.com, supabase.com, neal.fun, learn.adafruit.com |
| `single_hero_anim` | one animated or live element, rest static | carloslorenzo.dev, ghostty.org, joshwcomeau.com, jzhao.xyz |
| `interactive_figures` | interactive figures, sliders or demos inside content | ciechanow.ski, distill.pub, devouringdetails.com, redblobgames.com |
| `heavy_3d` | heavy 3D, WebGL or scroll-driven animation throughout | rauno.me, press.stripe.com |

## 15 · Personality / voice (pick one)

_What personality does the design project?_

| Option | What it means | Best examples |
|---|---|---|
| `austere_technical` | austere, precise and technical | carloslorenzo.dev, ryanancheta.com, portfolio-airil.vercel.app, oxide.computer |
| `warm_personal` | warm, friendly and personal | daylightcomputer.com, jvns.ca, Dribbble dr04, taniarascia.com |
| `playful` | playful and whimsical | neal.fun, fly.io, panic.com, joshwcomeau.com |
| `scholarly` | scholarly and bookish | eloquentjavascript.net, gwern.net, asifuddin.com, ineedmore.coffee |
| `bold_loud` | bold, loud and attention-grabbing | zoomie.github.io, Dribbble dr10, astral.sh, charm.land |
| `luxe_minimal` | premium, polished and minimal | resend.com, analogue.co, cosmos.so, ollama.com |
