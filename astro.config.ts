import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkDirective from "remark-directive";
import remarkMath from "remark-math";

import { remarkAdmonitions } from "./src/plugins/remark-admonitions.mjs";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";
import codeTheme from "./src/styles/shiki-dark.json";

export default defineConfig({
	// user GitHub Pages site; SITE env var can override (e.g. a custom domain)
	site: process.env.SITE ?? "https://kamrulhasan12345.github.io",
	// "ignore" keeps both /page/ links and /og/x.png endpoints working on any
	// host, without depending on host-specific trailing-slash redirects.
	trailingSlash: "ignore",
	integrations: [sitemap()],
	markdown: {
		remarkPlugins: [remarkMath, remarkDirective, remarkAdmonitions, remarkReadingTime],
		rehypePlugins: [rehypeKatex],
		shikiConfig: {
			// @ts-expect-error custom textmate theme JSON satisfies the shape at runtime
			theme: codeTheme,
			wrap: false,
		},
	},
});
