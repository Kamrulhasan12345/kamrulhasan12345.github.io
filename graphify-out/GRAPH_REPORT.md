# Graph Report - identity-redesign  (2026-10-16)

## Corpus Check
- 30 files · ~10,810 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 128 nodes · 168 edges · 14 communities
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
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
- bayyinah.md

## God Nodes (most connected - your core abstractions)
1. `@/data/resume` - 20 edges
2. `@/layouts/Base.astro` - 12 edges
3. `@/components/ProjectCard.astro` - 11 edges
4. `@/content.config` - 7 edges
5. `getPosts()` - 7 edges
6. `scripts` - 6 edges
7. `@/components/PixelIcon.astro` - 6 edges
8. `@/data/categories` - 6 edges
9. `@/components/Header.astro` - 5 edges
10. `@/components/Tag.astro` - 5 edges

## Surprising Connections (you probably didn't know these)
- `getStaticPaths()` --calls--> `getPosts()`  [EXTRACTED]
  src/pages/blog/[slug].astro → src/content.config.ts
- `GET()` --calls--> `getPosts()`  [EXTRACTED]
  src/pages/rss.xml.ts → src/content.config.ts

## Import Cycles
- None detected.

## Communities (14 total, 0 thin omitted)

### Community 0 - "@/data/collections"
Cohesion: 0.19
Nodes (10): @/components/SectionHead.astro, @/components/Tag.astro, @/content.config, blog, collections, getPosts(), date, getStaticPaths() (+2 more)

### Community 1 - "dependencies"
Cohesion: 0.29
Nodes (7): astro, @astrojs/rss, @astrojs/sitemap, dependencies, astro, @astrojs/rss, @astrojs/sitemap

### Community 2 - "@/layouts/Base.astro"
Cohesion: 0.16
Nodes (17): @/styles/base.css, @/styles/tokens.css, @/components/Footer.astro, year, @/components/Header.astro, rev, tabs, @/components/Oled.astro (+9 more)

### Community 3 - "package.json"
Cohesion: 0.12
Nodes (15): @astrojs/check, devDependencies, @astrojs/check, typescript, name, private, scripts, build (+7 more)

### Community 4 - "tsconfig.json"
Cohesion: 0.18
Nodes (11): compilerOptions, baseUrl, paths, exclude, extends, include, @/*, astro/tsconfigs/strict (+3 more)

### Community 6 - "kamrulhasan — portfolio & blog"
Cohesion: 0.14
Nodes (16): @/components/Card.astro, @/components/PixelIcon.astro, cells, @/components/ProjectCard.astro, haystack, @/data/categories, categoryStyle, categories (+8 more)

### Community 7 - "hello-world.md"
Cohesion: 0.25
Nodes (6): [], @/components/Button.astro, projects, neutrals, space, type

### Community 8 - "new-post.mjs"
Cohesion: 0.40
Nodes (4): path, slug, title, today

### Community 9 - "@/layouts/BlogPost.astro"
Cohesion: 0.29
Nodes (6): Adding a project, Before deploying, Develop, kamrulhasan — portfolio & blog, What the Markdown pipeline gives you, Writing a post

### Community 10 - "why-polyglot-ayahbot.md"
Cohesion: 0.33
Nodes (5): Stage 1: Preprocessing, Stage 2: Compilation to assembly, Stage 3: Assembly to object code, Stage 4: Linking, Why this matters

### Community 11 - "content.config.ts"
Cohesion: 0.40
Nodes (4): From characters to tokens, Maximal munch, and where it bites, Regular languages under the hood, Try it yourself

### Community 12 - "ayahbot.md"
Cohesion: 0.50
Nodes (3): The core trick, The sharp edges, When to graduate

### Community 13 - "bayyinah.md"
Cohesion: 0.50
Nodes (3): Spend RAM where it thinks, The constraint is the curriculum, zram first

## Knowledge Gaps
- **64 isolated node(s):** `name`, `type`, `version`, `private`, `dev` (+59 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@/data/resume` connect `@/layouts/Base.astro` to `kamrulhasan — portfolio & blog`, `hello-world.md`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Why does `@/layouts/Base.astro` connect `@/layouts/Base.astro` to `@/data/collections`, `kamrulhasan — portfolio & blog`, `hello-world.md`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **What connects `name`, `type`, `version` to the rest of the system?**
  _64 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Should `kamrulhasan — portfolio & blog` be split into smaller, more focused modules?**
  _Cohesion score 0.1437908496732026 - nodes in this community are weakly interconnected._