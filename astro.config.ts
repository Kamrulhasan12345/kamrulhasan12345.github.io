import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkDirective from "remark-directive";
import remarkMath from "remark-math";

import { remarkAdmonitions } from "./src/plugins/remark-admonitions.mjs";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";
import phosphor from "./src/styles/shiki-phosphor.json";

export default defineConfig({
	// TODO: set the real domain before deploying; SITE env var overrides for now
	site: process.env.SITE ?? "https://example.com",
	// "ignore" keeps both /page/ links and /og/x.png endpoints working on any
	// host, without depending on host-specific trailing-slash redirects.
	trailingSlash: "ignore",
	integrations: [sitemap()],
	markdown: {
		remarkPlugins: [remarkMath, remarkDirective, remarkAdmonitions, remarkReadingTime],
		rehypePlugins: [rehypeKatex],
		shikiConfig: {
			// @ts-expect-error custom textmate theme JSON satisfies the shape at runtime
			theme: phosphor,
			wrap: false,
		},
	},
});
