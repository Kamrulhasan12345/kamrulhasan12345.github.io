# kamrulhasan — portfolio & blog

Personal site for Mohammad Kamrul Hasan. Astro, hand-built, zero client
JavaScript, one self-hosted typeface (JetBrains Mono, Latin subset), no external
requests at runtime. Plain one-column layout that follows the system theme,
with the old phosphor green as the only accent. All facts live in
`src/data/resume.ts`.

`public/resume.pdf` is built from the private master résumé with
`scripts/web-resume.sh` (drops the phone number; needs `tectonic`).

## Develop

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # astro check && astro build -> ./dist
npm run preview    # serve the production build locally
```

Node 24 (see `.nvmrc`).

## Writing a post

```sh
npm run new-post "Reading a stack frame by hand"
# -> creates src/content/blog/reading-a-stack-frame-by-hand.md (draft: true)
```

Then open the file in your editor and write Markdown. Frontmatter fields
(validated in `src/content.config.ts`):

| field         | required | notes                                         |
| ------------- | -------- | --------------------------------------------- |
| `title`       | yes      | ≤ 90 chars                                    |
| `description` | yes      | ≤ 200 chars; used for previews, OG, RSS       |
| `publishDate` | yes      | `YYYY-MM-DD`                                   |
| `updatedDate` | no       | `YYYY-MM-DD`                                   |
| `tags`        | no       | string array, default `[]`                    |
| `draft`       | no       | `true` hides from prod build, RSS, OG, sitemap |

Drafts render in `npm run dev` but are excluded from `npm run build`. To
publish, set `draft: false` (or remove the line).

### What the Markdown pipeline gives you

- Syntax highlighting via a custom calm-dark Shiki theme (`src/styles/shiki-dark.json`), tuned for C / asm
- Math with KaTeX: `$inline$` and `$$display$$`
- Admonitions: `:::note`, `:::tip`, `:::warning` … `:::`
- GFM footnotes and tables
- Auto table of contents (from `##` / `###` headings)
- Reading-time estimate
- Auto-generated OG card per post (`/og/<slug>.png`)

## Adding a project

Create `src/content/projects/<slug>.md` with the frontmatter shape in
`src/content.config.ts`. `featured: true` surfaces it on the home page;
`order` controls sort.

## Before deploying

- Set the real domain: `SITE` env var, or edit the fallback in `astro.config.ts` and `src/site.config.ts`.
- Search for `TODO` across `src/` and fill in / verify every placeholder (links, handles, dates, project details).
- Review the two seed posts (`draft: true`) — edit or delete.

Output is a portable static `dist/`; deploy anywhere that serves files.
