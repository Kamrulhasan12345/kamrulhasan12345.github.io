import sitemap from "@astrojs/sitemap";
import { defineConfig, passthroughImageService } from "astro/config";

import codeTheme from "./src/styles/shiki-dark.json";

export default defineConfig({
	// user GitHub Pages site; SITE env var can override (e.g. a custom domain)
	site: process.env.SITE ?? "https://kamrulhasan12345.github.io",
	trailingSlash: "ignore",
	integrations: [sitemap()],
	// no image processing on this site, so skip the sharp dependency
	image: { service: passthroughImageService() },
	markdown: {
		// @ts-expect-error custom textmate theme JSON satisfies the shape at runtime
		shikiConfig: { theme: codeTheme },
	},
});
