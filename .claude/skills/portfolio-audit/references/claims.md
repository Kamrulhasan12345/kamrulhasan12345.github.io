# Claim verification

A **claim** is any sentence that asserts a fact about the owner's work: a number, a role, a scope word ("owned", "led", "end to end"), a result, a team size, or a status ("released", "deployed"). Every claim on the site and the résumé gets one ledger row.

## Ledger row

`claim · surface (site page / résumé line) · source checked · evidence (path, URL, line) · verdict · rewrite`

Verdicts:
- **verified:** the source shows it, with the context the claim implies.
- **overclaimed:** the source shows something smaller or narrower. Rewrite it to the verified form.
- **unverifiable:** no public or owner-provided source. Keep it only on the résumé, and only if it comes from the master YAML; otherwise cut it.
- **filler:** true but not an achievement. Cut it, or merge it into a real claim.

## The 12 questions (ask every claim)

1. **Whose result?** Did the owner measure it, or is it a pretrained model's or upstream's public number? (Example: an MTEB score quoted for a downloaded model.)
2. **On what?** Dataset, class count, device, model, split. A metric on 2 merged classes is not comparable to the standard 10-class benchmark. Say what it was measured on.
3. **Against what?** A speedup needs a named baseline. Lead with the fair baseline, not the weakest one.
4. **Held-out?** Accuracy measured on training data is not a result.
5. **Real data?** Synthetic or seeded data must be disclosed ("on synthetic transaction data").
6. **Which part caused it?** Don't credit a technique (tiling, SAHI) with a number it didn't produce.
7. **Role true?** Compare "led", "team of N" and "sole owner" with `gh api .../contributors`, README team sections and the YAML. Supervisors and course-library authors don't count as teammates.
8. **Scope word earned?** "Owned", "end to end", "architected", "3D engine": is there evidence of that scope?
9. **Context disclosed?** Course project, hackathon, take-home task, tutorial: say so. Hiding it reads as deception once found.
10. **Domain fact, not an achievement?** Counts that are just properties of the domain (6,236 Quran verses, 64 districts) are not results.
11. **Activity, not outcome?** Commit counts, test counts, "worked with PRs", "used Git" are expected behaviour. Keep them only if tied to an outcome ("209 assertions let every number be regenerated").
12. **Does the repo back it publicly?** No public repo, or a near-empty one (under ~5 commits, no README), means the project goes off the site or gets marked in progress. Half-finished work is a hiring red flag (evidence E8).

13. **Dates right?** A project's year must fall inside the repo's creation date and commit range (`gh api repos/<u>/<r>` → `created_at`; commits → dates). The YAML is not proof of dates.
14. **Still true today?** For claims about third-party software (a bug, a missing feature), check the upstream issue/PR. If it was fixed, use the past tense and cite the fix.
15. **Is the feature in the code?** A dependency in `requirements.txt`/`package.json` proves nothing. Find the call site, and name only what the code actually calls.

## Rewrite formula

`<verb> <what> <how: specific tech keywords> → <measured result> <on what / vs what> (<context>)`

Each bullet: at most 2 lines, an action verb first, a number only if verified, and keywords a recruiter searches for (from real job postings, not invented).

## Job families (titles)

These are different jobs. Never put two in one title or headline:
- **AI engineer:** builds products on LLMs (RAG, agents, API integration, evals).
- **ML engineer:** trains, evaluates and serves models; data pipelines.
- **On-device / edge ML:** a narrow specialism inside ML engineering (quantization, kernels, mobile/embedded performance).
- **Backend engineer:** services, APIs, databases, queues.
- **Embedded engineer:** firmware, drivers, microcontrollers.
- **Research assistant:** academic research.

With no target role named by the owner, the headline states facts ("CSE undergraduate at BUET · class of 2028", current internship), and the work shows the range. A title can be added per application in a tailored résumé.
