# Graph Report - plain-redesign  (2026-10-16)

## Corpus Check
- 21 files · ~6,110 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 108 nodes · 117 edges · 13 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `eeaa3240`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- @/data/collections
- dependencies
- @/layouts/Base.astro
- package.json
- tsconfig.json
- kamrulhasan — portfolio & blog
- hello-world.md
- new-post.mjs
- @/layouts/BlogPost.astro
- why-polyglot-ayahbot.md
- content.config.ts
- ayahbot.md

## God Nodes (most connected - your core abstractions)
1. `@/data/resume` - 17 edges
2. `@/layouts/Base.astro` - 11 edges
3. `@/content.config` - 7 edges
4. `scripts` - 6 edges
5. `getPosts()` - 5 edges
6. `kamrulhasan — portfolio & blog` - 5 edges
7. `@/components/Footer.astro` - 3 edges
8. `@/components/Header.astro` - 3 edges
9. `profile` - 3 edges
10. `include` - 3 edges

## Surprising Connections (you probably didn't know these)
- `getStaticPaths()` --calls--> `getPosts()`  [EXTRACTED]
  src/pages/blog/[slug].astro → src/content.config.ts
- `GET()` --calls--> `getPosts()`  [EXTRACTED]
  src/pages/rss.xml.ts → src/content.config.ts

## Import Cycles
- None detected.

## Communities (13 total, 0 thin omitted)

### Community 0 - "@/data/collections"
Cohesion: 0.25
Nodes (8): @/content.config, blog, collections, getPosts(), date, getStaticPaths(), minutes, GET()

### Community 1 - "dependencies"
Cohesion: 0.29
Nodes (7): astro, @astrojs/rss, @astrojs/sitemap, dependencies, astro, @astrojs/rss, @astrojs/sitemap

### Community 2 - "@/layouts/Base.astro"
Cohesion: 0.14
Nodes (10): @/styles/base.css, @/styles/tokens.css, @/components/Footer.astro, year, @/components/Header.astro, links, profile, @/layouts/Base.astro (+2 more)

### Community 3 - "package.json"
Cohesion: 0.12
Nodes (15): @astrojs/check, devDependencies, @astrojs/check, typescript, name, private, scripts, build (+7 more)

### Community 4 - "tsconfig.json"
Cohesion: 0.18
Nodes (11): compilerOptions, baseUrl, paths, exclude, extends, include, @/*, astro/tsconfigs/strict (+3 more)

### Community 6 - "kamrulhasan — portfolio & blog"
Cohesion: 0.17
Nodes (13): @/data/resume, about, categories, Category, education, experience, profiles, Project (+5 more)

### Community 7 - "hello-world.md"
Cohesion: 0.29
Nodes (6): Adding a project, Before deploying, Develop, kamrulhasan — portfolio & blog, What the Markdown pipeline gives you, Writing a post

### Community 8 - "new-post.mjs"
Cohesion: 0.40
Nodes (4): path, slug, title, today

### Community 9 - "@/layouts/BlogPost.astro"
Cohesion: 0.33
Nodes (5): Stage 1: Preprocessing, Stage 2: Compilation to assembly, Stage 3: Assembly to object code, Stage 4: Linking, Why this matters

### Community 10 - "why-polyglot-ayahbot.md"
Cohesion: 0.40
Nodes (4): From characters to tokens, Maximal munch, and where it bites, Regular languages under the hood, Try it yourself

### Community 11 - "content.config.ts"
Cohesion: 0.50
Nodes (3): The core trick, The sharp edges, When to graduate

### Community 12 - "ayahbot.md"
Cohesion: 0.50
Nodes (3): Spend RAM where it thinks, The constraint is the curriculum, zram first

## Knowledge Gaps
- **58 isolated node(s):** `name`, `type`, `version`, `private`, `dev` (+53 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@/layouts/Base.astro` connect `@/layouts/Base.astro` to `@/data/collections`, `kamrulhasan — portfolio & blog`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `@/data/resume` connect `kamrulhasan — portfolio & blog` to `@/layouts/Base.astro`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `@/content.config` connect `@/data/collections` to `@/layouts/Base.astro`, `kamrulhasan — portfolio & blog`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `name`, `type`, `version` to the rest of the system?**
  _58 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `@/layouts/Base.astro` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._