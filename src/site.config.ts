export const siteConfig = {
	author: "Mohammad Kamrul Hasan",
	// TODO: set the real domain before deploying (also see astro.config.ts)
	url: import.meta.env.SITE ?? "https://example.com",
	title: "Mohammad Kamrul Hasan",
	role: "Systems & hardware security",
	location: "Dhaka, Bangladesh",
	description:
		"CSE undergraduate at BUET working across systems programming, hardware security, backends, and ML. A decade of builds.",
	// TODO: verify email before publishing
	email: "kamrulhasan59246@gmail.com",
	social: {
		// TODO: verify handles / add real URLs before publishing
		github: "https://github.com/kamrulhasan12345",
		linkedin: "https://linkedin.com/in/kamrulhasan12345",
	},
	nav: [
		{ label: "Projects", href: "/projects/" },
		{ label: "Blog", href: "/blog/" },
		{ label: "About", href: "/about/" },
	],
} as const;
