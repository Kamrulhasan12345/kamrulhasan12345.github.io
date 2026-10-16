---
name: portfolio-audit
description: Use when asked to audit, review, check or improve the portfolio site, its projects, blog, résumé PDF or personal-branding copy, or before publishing/merging any change to them; also when a recruiter, visitor or "is this BS?" perspective is requested.
---

# Portfolio Audit

Full, unattended audit of Kamrul's portfolio (this Astro repo) and résumé. The owner should not have to say what to check: every source, visitor type, claim and check below is in scope by default.

**Core principle:** every sentence a visitor reads must be (1) true and checkable against a named source, (2) useful to at least one visitor type within their time budget, and (3) technically sound. Anything else is a finding.

## Non-negotiables

1. **Check every source in the registry.** Each gets a row in the report: `checked` with what was found, or `blocked` with the exact reason (login wall, 403). "The user said focus on X" does not make a source optional.
2. **Every claim gets a ledger row with evidence** (file path, URL, commit, README line). No evidence → it's not verified, however impressive it sounds. Rubric: `references/claims.md`.
3. **Never invent facts, numbers, titles or roles.** Rewrites only reword, add context, or cut.
4. **No job title unless the owner names a target role.** Never combine job families in one title. Rule: `references/claims.md` §Job families.
5. **Provenance:** every post, image and paragraph must be the owner's or licensed and credited. Check `git log` messages for "imported", "reference" or "from".
6. **Verify after every fix:** rebuild, rerun the script, re-screenshot. A fix is not done until the evidence shows it.
7. **A scope hint sets the order, not the coverage.** "Focus on Projects" means do Projects first, then every other page and check. If a check truly can't run, list its ID under "Not checked", with the reason.
8. **Linked repos are part of the site.** A secret committed to any repo the site links to is a critical finding (J-SEC-01). Report the file path only; never print or read its contents.

## Sources registry

| Source | How to read it |
|---|---|
| Site repo (this worktree) | files, `git log`, `npm run build` |
| Built site | `dist/` + headless screenshots |
| Master résumé data | `~/Personal/resumes/resume_master.yaml` (facts, `confirm:` flags) |
| Submittable résumé | `~/Personal/resumes/kamrul_hasan_resume_1page.tex` → PDF |
| GitHub repos | `gh api repos/Kamrulhasan12345/<repo>/readme`, `.../contributors`, `.../commits` |
| Obsidian vault | `~/vault` (articles: `Daily Life/Tachyons`, `Daily Life/Learning/**/writeups`; notes: `Daily Life/Projects`) |
| Devpost | `chromium --headless=new --user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36" --dump-dom https://devpost.com/Kamrulhasan12345[/challenges]`. WebFetch gets 403; without the UA flag, Cloudflare serves a challenge page. Still blocked: use the claude-in-chrome tools in the owner's own browser, else `blocked`. |
| Public profiles | ORCID, Codeforces, Kaggle, Hugging Face URLs in `src/data/resume.ts` |
| LinkedIn, Facebook (Tachyon group) | login required: mark `blocked`, ask once at the end |

## Procedure

Create one task per step. Run them in order.

1. **Build and run the mechanical checks.** `npm run build`, then `node .claude/skills/portfolio-audit/scripts/mechanical.mjs dist public/resume.pdf`. Keep the JSON lines; they become `M-*` findings. If the script itself changed, run `bash .claude/skills/portfolio-audit/scripts/selftest.sh` first.
2. **Screenshot.** Headless Chromium, at most 3 browser processes at once. Every page type at 1366 px light and 390 px dark: `--force-dark-mode --blink-settings=preferredColorScheme=0`. Look at every image.
3. **Inventory.** List pages, nav items, projects (featured/more), posts, résumé sections, and every claim-bearing sentence.
4. **Gather evidence** from every registry source. Record each one's status.
5. **Claim ledger.** One row per claim on the site and the résumé, judged with `references/claims.md`.
6. **Visitor walkthroughs.** For each persona in `references/visitors.md`, run its task path and time budget, and record pass/fail with the blocking element.
7. **Checks catalogue.** Go through every ID in `references/checks.md` and mark pass/fail/n.a., with evidence.
8. **Cross-surface consistency.** Compare site, résumé, LinkedIn (if readable), Devpost, READMEs and the master YAML: titles, dates, numbers, project names. Every mismatch is a finding.
9. **Report** (contract below). Write `docs/audits/<YYYY-MM-DD>/report.md` and `findings.json`, then publish the report as an Artifact.
10. **Fix** under the autonomy rules, then verify (non-negotiable 6). Commit with no Co-Authored-By/AI trailer, and push if you can.

## Autonomy rules

| Fix without asking | Ask first (list under "Decisions needed") |
|---|---|
| `M-*` technical failures: meta, a11y, links, weight, layout bugs | Job title or headline identity |
| Rewording a claim to its verified form (add context, cut unproven parts) | Adding, removing or demoting a project or post |
| Résumé ATS/format fixes, rebuilding the web PDF | Publishing anything new from vault, Devpost or social |
| Copy that contradicts its own source | Anything privacy-related beyond removing a phone number |
| | Edits to files outside this repo, except rebuilding résumé PDFs |

## Report contract

`report.md`, in this order:
1. **Verdict:** one line, plus a count per severity (critical/high/medium/low).
2. **Top 5 actions:** imperative, each naming its file.
3. **Sources table:** every registry row, `checked`/`blocked`, and what it changed.
4. **Visitor results:** persona → pass/fail → blocking element.
5. **Claim ledger:** claim · surface · verdict (verified/overclaimed/unverifiable/filler) · evidence · rewrite.
6. **Findings:** grouped by severity. Each has ID, where, evidence, fix, and `auto` or `ask`.
7. **Decisions needed:** questions only the owner can answer, each with a recommended option.
8. **Fixed in this run:** what changed, and the verification evidence for it.

9. **Not checked:** check IDs and sources skipped, each with its reason. Write "none" if empty.

If the harness blocks writing `.md` files (subagents), write `report.html`, or return the full report text in the final message. Never drop it.

`findings.json`: an array of `{id, severity, where, evidence, fix, mode: "auto"|"ask", status: "open"|"fixed"}`.

The final chat message follows the owner's ADHD format. It starts with the next action, uses numbered steps and ranked groups of at most 5, gives concrete times, and ends with one next action plus a `result:` line.

## Red flags: stop and correct

| Thought | Reality |
|---|---|
| "The owner said first things first, so I'll skip the vault/Devpost" | Skipping a named source is a defect. Check it or mark it `blocked`. |
| "The README says 0.81, so it's verified" | READMEs quote borrowed benchmarks. Whose result is it, on what data, against what baseline? |
| "AI Engineer · On-Device · Backend sums them up" | That's three job families. No title without a target role. |
| "Commit says 'from the reference blog', probably fine" | Provenance unknown means unpublishable until the owner confirms. |
| "The PDF looks fine" | Run `pdftotext`. Ligatures and icon fonts break ATS keyword matching. |
| "Fixed, no need to re-screenshot" | Unverified fix, so it isn't fixed. |
| "Sounds impressive, keep it" | Impressive and unverifiable is worse than modest and true. |
| "A summary helps recruiters" | The owner has ruled it out: no summary on the résumé. |
| "`requirements.txt` lists it, so the project uses it" | A dependency is not a feature. Find the call site in the code. |
| "The YAML says 2025" | The YAML has been wrong before. Dates come from repo creation and commit ranges. |
| "It was true when written" | Re-check upstream: bugs get fixed, so state it in the past tense with the link. |
