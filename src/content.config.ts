import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
	schema: z.object({
		title: z.string().max(90),
		description: z.string().max(200),
		publishDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
	}),
});

const projects = defineCollection({
	loader: glob({ base: "./src/content/projects", pattern: "**/*.md" }),
	schema: z.object({
		title: z.string(),
		summary: z.string().max(240),
		role: z.string(),
		stack: z.array(z.string()),
		links: z
			.object({
				repo: z.string().url().optional(),
				live: z.string().url().optional(),
				writeup: z.string().optional(),
			})
			.default({}),
		featured: z.boolean().default(false),
		order: z.number().default(99),
	}),
});

export const collections = { blog, projects };
