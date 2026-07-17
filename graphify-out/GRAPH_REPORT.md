# Graph Report - kamrulhasan12345  (2026-07-17)

## Corpus Check
- 48 files · ~9,494 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 156 nodes · 177 edges · 29 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7dfe3a31`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- @/data/collections
- dependencies
- @/layouts/Base.astro
- package.json
- tsconfig.json
- astro.config.ts
- kamrulhasan — portfolio & blog
- hello-world.md
- new-post.mjs
- @/layouts/BlogPost.astro
- why-polyglot-ayahbot.md
- content.config.ts
- skip-locked-job-queue.md
- why-i-run-arch-on-6gb.md

## God Nodes (most connected - your core abstractions)
1. `@/layouts/Base.astro` - 16 edges
2. `@/data/collections` - 13 edges
3. `getPublishedPosts()` - 12 edges
4. `scripts` - 6 edges
5. `@/layouts/BlogPost.astro` - 6 edges
6. `siteConfig` - 6 edges
7. `@/components/PostPreview.astro` - 5 edges
8. `getAllProjects()` - 5 edges
9. `getAllTags()` - 5 edges
10. `kamrulhasan — portfolio & blog` - 5 edges

## Surprising Connections (you probably didn't know these)
- `GET()` --calls--> `getPublishedPosts()`  [EXTRACTED]
  src/pages/rss.xml.ts → src/data/collections.ts
- `getStaticPaths()` --calls--> `getPublishedPosts()`  [EXTRACTED]
  src/pages/blog/[slug].astro → src/data/collections.ts
- `getStaticPaths()` --calls--> `getPublishedPosts()`  [EXTRACTED]
  src/pages/og/[...slug].png.ts → src/data/collections.ts
- `getStaticPaths()` --calls--> `getAllProjects()`  [EXTRACTED]
  src/pages/projects/[slug].astro → src/data/collections.ts
- `getStaticPaths()` --calls--> `getPublishedPosts()`  [EXTRACTED]
  src/pages/tags/[tag].astro → src/data/collections.ts

## Import Cycles
- None detected.

## Communities (29 total, 0 thin omitted)

### Community 0 - "@/data/collections"
Cohesion: 0.18
Nodes (14): @/components/PostPreview.astro, @/components/ProjectCard.astro, @/data/collections, getAllProjects(), getAllTags(), getFeaturedProjects(), getPublishedPosts(), getStaticPaths() (+6 more)

### Community 1 - "dependencies"
Cohesion: 0.09
Nodes (23): @astrojs/rss, @astrojs/sitemap, katex, mdast-util-to-string, dependencies, astro, @astrojs/rss, @astrojs/sitemap (+15 more)

### Community 2 - "@/layouts/Base.astro"
Cohesion: 0.15
Nodes (12): @/styles/global.css, @/components/Footer.astro, year, @/components/Header.astro, @/layouts/Base.astro, canonical, socialImage, GET() (+4 more)

### Community 3 - "package.json"
Cohesion: 0.12
Nodes (15): @astrojs/check, devDependencies, @astrojs/check, typescript, name, private, scripts, build (+7 more)

### Community 4 - "tsconfig.json"
Cohesion: 0.18
Nodes (11): astro/tsconfigs/strict, .astro/types.d.ts, dist, src/**/*, compilerOptions, baseUrl, paths, exclude (+3 more)

### Community 5 - "astro.config.ts"
Cohesion: 0.38
Nodes (4): TODO: set the real domain before deploying; SITE env var overrides for now, KINDS, remarkAdmonitions(), remarkReadingTime()

### Community 6 - "kamrulhasan — portfolio & blog"
Cohesion: 0.29
Nodes (6): Adding a project, Before deploying, Develop, kamrulhasan — portfolio & blog, What the Markdown pipeline gives you, Writing a post

### Community 7 - "hello-world.md"
Cohesion: 0.33
Nodes (5): Stage 1: Preprocessing, Stage 2: Compilation to assembly, Stage 3: Assembly to object code, Stage 4: Linking, Why this matters

### Community 8 - "new-post.mjs"
Cohesion: 0.40
Nodes (4): path, slug, title, today

### Community 9 - "@/layouts/BlogPost.astro"
Cohesion: 0.29
Nodes (7): katex/dist/katex.min.css, @/components/FormattedDate.astro, display, iso, @/components/TOC.astro, items, @/layouts/BlogPost.astro

### Community 10 - "why-polyglot-ayahbot.md"
Cohesion: 0.40
Nodes (4): From characters to tokens, Maximal munch, and where it bites, Regular languages under the hood, Try it yourself

### Community 11 - "content.config.ts"
Cohesion: 0.50
Nodes (3): blog, collections, projects

### Community 27 - "skip-locked-job-queue.md"
Cohesion: 0.50
Nodes (3): The core trick, The sharp edges, When to graduate

### Community 28 - "why-i-run-arch-on-6gb.md"
Cohesion: 0.50
Nodes (3): Spend RAM where it thinks, The constraint is the curriculum, zram first

## Knowledge Gaps
- **65 isolated node(s):** `name`, `type`, `version`, `private`, `dev` (+60 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Why does `@/layouts/Base.astro` connect `@/layouts/Base.astro` to `@/data/collections`, `@/layouts/BlogPost.astro`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `@/layouts/BlogPost.astro` connect `@/layouts/BlogPost.astro` to `@/data/collections`, `@/layouts/Base.astro`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `TODO: set the real domain before deploying; SITE env var overrides for now`, `name`, `type` to the rest of the system?**
  _69 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._