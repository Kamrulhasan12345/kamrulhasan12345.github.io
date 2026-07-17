export const siteConfig = {
	author: "Mohammad Kamrul Hasan",
	handle: "kamrul",
	studio: "bitcraft",
	// TODO: set the real domain before deploying (also see astro.config.ts)
	url: import.meta.env.SITE ?? "https://example.com",
	title: "Mohammad Kamrul Hasan",
	description:
		"Systems programming, hardware security, and reverse engineering. CSE at BUET. Builder of small, sharp tools under the Bitcraft label.",
	// TODO: verify email before publishing
	email: "kamrulhasan59246@gmail.com",
	social: {
		// TODO: verify handles — placeholders until confirmed
		github: "https://github.com/kamrulhasan12345",
	},
	nav: [
		{ label: "~/projects", href: "/projects/" },
		{ label: "~/blog", href: "/blog/" },
		{ label: "~/tags", href: "/tags/" },
		{ label: "~/about", href: "/about/" },
	],
} as const;

/** Terminal prompt string used across the site. */
export const PROMPT = `${siteConfig.handle}@${siteConfig.studio}`;
