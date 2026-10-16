# Checks catalogue

Mark every ID **pass / fail / n.a.** with evidence. `M-*` checks come from `scripts/mechanical.mjs` (copy its verdicts and re-check its false positives). `J-*` checks need judgement, screenshots or sources. The severity of a failure is fixed here, so reports stay comparable between runs. E-numbers point to `evidence.md`.

Severity: **critical** = false, borrowed or privacy-leaking content · **high** = fails a persona's task path · **medium** = weakens trust or scanning · **low** = polish.

## Identity and first screen
| ID | Check | Sev |
|---|---|---|
| M-HOME-01 | Email visible as text before the first section | high |
| M-HOME-02 | Résumé link before the first section | high |
| M-HOME-03 | Availability statement on the first screen | high |
| M-HOME-04 | Graduation year on the first screen | medium |
| J-ID-01 | Headline states facts, or one job family the owner chose; never mixed families (claims.md) | critical |
| J-ID-02 | At 1366×900 and 390×844 the first screen answers: who, what now, open to what, how to contact (P1 in 10 s) | high |
| J-ID-03 | Same name, headline, dates and current role on site, résumé, LinkedIn, Devpost, GitHub bio | high |

## Navigation and structure
| ID | Check | Sev |
|---|---|---|
| M-NAV-01 | 4–5 top-level nav items (E5) | high |
| M-NAV-02 | No "Home" item; the name/logo links home | low |
| J-NAV-01 | Plain labels (Projects, Writing, About, Résumé); no clever names (E6) | medium |
| J-NAV-02 | Nav fits on one line at 390 px, or wraps without stray dividers | medium |
| J-NAV-03 | No page exists only to hold 1–2 items; merge thin pages into About and redirect them | medium |
| J-NAV-04 | Sections hidden when empty (Writing with 0 posts, RSS with 0 posts) | medium |
| M-LNK-01/02 | No broken internal links; every redirect target exists | high |

## Projects
| ID | Check | Sev |
|---|---|---|
| J-PRJ-01 | 3–5 featured projects with depth; the rest as one-liners (E7) | high |
| J-PRJ-02 | Every featured project: problem, own role, approach, verified number, repo link | high |
| J-PRJ-03 | Every project passes claims.md; ledger row exists | critical |
| J-PRJ-04 | Context disclosed: course/hackathon/take-home/team size | high |
| J-PRJ-05 | No project without a public repo, or with a near-empty one; in-progress work labelled | high |
| J-PRJ-06 | Plain text never looks like a link (no underline without href) | high |
| J-PRJ-07 | Repo README **and** GitHub "About" description agree with the site (numbers, stack, model names); disagreement goes in "Decisions needed" | high |
| J-PRJ-08 | Project years match repo creation and commit dates (claims.md Q13); list order matches | high |

## Security and privacy
| ID | Check | Sev |
|---|---|---|
| J-SEC-01 | No committed secrets in any linked repo. Run `gh api "repos/<u>/<r>/git/trees/HEAD?recursive=1" -q '.tree[].path'` and match `(^|/)\.env($|\.)`, `\.pem$`, `id_rsa`, `credentials`, `secret`. Report paths only, never contents | critical |
| J-SEC-02 | No phone number, home address, student ID or personal email other than the public one on the site or in public PDFs | critical |

## Writing
| ID | Check | Sev |
|---|---|---|
| J-WRT-01 | Every post written by the owner: check git log messages, then the vault and other sources | critical |
| J-WRT-02 | Images: owner's own, or licensed with a visible credit; no hotlinked images | critical |
| J-WRT-03 | Each post ends with an author line and a path to projects/contact | medium |
| J-WRT-04 | Non-English posts: `lang` set and a self-hosted font with matched size; check conjuncts in screenshots | medium |
| J-WRT-05 | Topics support the owner's actual work; flag gaps (e.g. no write-up of the flagship project) | low |

## About and experience
| ID | Check | Sev |
|---|---|---|
| J-ABT-01 | Experience bullets pass claims.md; no filler ("used Git", "worked with PRs") | high |
| J-ABT-02 | Education: degree, school, expected graduation, CGPA if strong | high |
| J-ABT-03 | Research: venue, DOI, honest own role (author position, task) | high |
| J-ABT-04 | Skills list only what projects or jobs above use; nothing unbacked | medium |
| J-ABT-05 | Contact: email as text, time zone, every verified profile | medium |

## Résumé (also see resume.md)
| ID | Check | Sev |
|---|---|---|
| M-CV-01 | Exactly 1 page | high |
| M-CV-02 | No phone number in the public PDF | critical |
| M-CV-03/04 | No ligatures or icon glyphs in the extracted text | high |
| M-CV-05 | Email extractable | high |
| M-CV-06 | No Summary/Objective section | medium |
| J-CV-01 | Every bullet passes claims.md and the rewrite formula | critical |
| J-CV-02 | Keyword coverage: the skills that bullets demonstrate are named in the bullets, not only in Skills | high |
| J-CV-03 | The web PDF matches the submittable PDF except for the phone number | medium |

## SEO, sharing, accessibility, performance
| ID | Check | Sev |
|---|---|---|
| M-SEO-01..08 | title, description (unique), canonical, og:*, twitter:card, noindex on redirects, JSON-LD, robots + sitemap, 404 | medium |
| J-SEO-01 | Open `public/og.png`: headline matches J-ID-01 | medium |
| M-A11Y-01..06 | lang, one h1, no heading jumps, alt text, skip link, `lang` on non-English text | medium |
| J-A11Y-01 | Contrast 4.5:1 text, 3:1 large, in both themes (E10) | high |
| J-A11Y-02 | Tap targets at least 24×24 px (E11); visible focus; reduced motion respected | medium |
| J-A11Y-03 | Light and dark both readable; follows the OS setting (E12) | medium |
| M-PERF-01..03 | HTML at most 60 KB/page, each font at most 100 KB (subset), no render-time external requests | low |
| J-PERF-01 | Fonts subset; `unicode-range` used for script-specific faces | low |

## Repo hygiene
| ID | Check | Sev |
|---|---|---|
| J-REPO-01 | README describes the current design and build | low |
| J-REPO-02 | No stale pages, components or data left from a previous design | low |
