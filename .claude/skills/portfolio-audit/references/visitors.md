# Visitor personas

Run each persona as a task path against the built site and screenshots. A persona **fails** when it can't complete its task inside its time budget, or when it meets something that makes it distrust the site. Record the blocking element: file, selector or sentence.

Time budgets come from NN/g: visitors decide to stay within about 10 s, read 20–28% of words, and spend 57% of viewing time above the fold (evidence.md E1–E3). No rigorous study of portfolio visitor types exists, so these personas are inferred from the owner's profile.

| # | Persona | Arrives via | Budget | Task path (must succeed) | Distrust triggers |
|---|---|---|---|---|---|
| P1 | Non-technical recruiter | LinkedIn/résumé link, home | 10 s first screen, under 1 min | Who is this? Current role? Grad year? Location/time zone? Open to what? Email + résumé reachable in 1 click | No role or availability up top; email hidden behind a word; 2-page or broken PDF |
| P2 | Engineering hiring manager | home → Projects | 2–5 min | Find the 2–3 strongest projects; for one, get problem, own role, approach, number, repo | Numbers without context; tutorial clones; many half-finished projects; repo contradicts site |
| P3 | Senior engineer doing a technical screen | a project repo or post | 5–15 min | Verify one claim end to end in the repo (README → code/results) | Borrowed metrics; "led"/"owned" with no evidence; README overclaims |
| P4 | Professor / research lead | About › Research | 1–3 min | Publications with own role, CGPA, research interests, ORCID | Inflated authorship role; no DOI |
| P5 | Hackathon / competition contact | Projects, Devpost | under 1 min | Results, team role, what was built during the event | Participation presented as achievement |
| P6 | Startup / freelance client | home | 1–2 min | What can he build, shipped work, contact | No live demos; no clear contact |
| P7 | Blog reader from search | a post URL directly | article length | Read the post, then "who wrote this?", then projects or contact | No author line; no way back; unreadable script (Bengali font) |
| P8 | Peer dev / OSS collaborator | GitHub, a post | varies | GitHub, write-ups, how things work | Empty repos linked from the site |
| P9 | Crawlers, link previews, LLM search | any URL | n/a | Title, description, og:image, JSON-LD Person/ProfilePage, sitemap | Missing preview card; duplicate descriptions |

For every persona, also answer: **too much?** (anything it must scroll past that serves no persona), and **too little?** (anything it needs that the site doesn't give it).
