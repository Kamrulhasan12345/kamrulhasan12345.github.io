#!/usr/bin/env node
// Scaffold a new blog post: `npm run new-post "My Post Title"`
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
	console.error('usage: npm run new-post "Post Title"');
	process.exit(1);
}

const slug = title
	.toLowerCase()
	.replace(/['"]/g, "")
	.replace(/[^a-z0-9]+/g, "-")
	.replace(/^-+|-+$/g, "");

const dir = "src/content/blog";
const path = join(dir, `${slug}.md`);

if (existsSync(path)) {
	console.error(`refusing to overwrite existing file: ${path}`);
	process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const frontmatter = `---
title: ${JSON.stringify(title)}
description: ""
publishDate: ${today}
tags: []
draft: true
---

`;

await mkdir(dir, { recursive: true });
await writeFile(path, frontmatter, "utf8");
console.log(`created ${path}`);
console.log(`  $EDITOR ${path}`);
