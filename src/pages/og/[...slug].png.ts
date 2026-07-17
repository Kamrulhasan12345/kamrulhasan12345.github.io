import { readFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import type { APIContext } from "astro";
import satori from "satori";
import { getPublishedPosts } from "@/data/collections";
import { PROMPT, siteConfig } from "@/site.config";

export async function getStaticPaths() {
	const posts = await getPublishedPosts();
	return [
		{ params: { slug: "default" }, props: { title: siteConfig.description, tags: [] as string[] } },
		...posts.map((post) => ({
			params: { slug: post.id },
			props: { title: post.data.title, tags: post.data.tags },
		})),
	];
}

const colors = {
	bg: "#0a0f0b",
	raise: "#0e1510",
	line: "#1d2c20",
	text: "#a9dfb2",
	bright: "#d6ffdf",
	accent: "#57e07f",
	dim: "#628f6c",
	amber: "#ffb454",
};

export async function GET({ props }: APIContext) {
	const { title, tags } = props as { title: string; tags: string[] };

	const [regular, bold] = await Promise.all([
		readFile("src/assets/fonts/JetBrainsMono-Regular.ttf"),
		readFile("src/assets/fonts/JetBrainsMono-Bold.ttf"),
	]);

	const svg = await satori(
		{
			type: "div",
			props: {
				style: {
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					backgroundColor: colors.bg,
					padding: "56px",
					fontFamily: "JetBrains Mono",
					color: colors.text,
				},
				children: [
					{
						type: "div",
						props: {
							style: {
								display: "flex",
								flexDirection: "column",
								flexGrow: 1,
								border: `2px solid ${colors.line}`,
								backgroundColor: colors.raise,
								padding: "48px 56px",
							},
							children: [
								{
									type: "div",
									props: {
										style: { display: "flex", fontSize: "26px", color: colors.dim },
										children: [
											{
												type: "span",
												props: {
													style: { color: colors.accent, fontWeight: 700 },
													children: `${PROMPT}:~$`,
												},
											},
											{ type: "span", props: { style: { marginLeft: "14px" }, children: "cat" } },
										],
									},
								},
								{
									type: "div",
									props: {
										style: {
											display: "flex",
											flexGrow: 1,
											alignItems: "center",
											fontSize: title.length > 60 ? "44px" : "54px",
											fontWeight: 700,
											color: colors.bright,
											lineHeight: 1.3,
										},
										children: title,
									},
								},
								{
									type: "div",
									props: {
										style: {
											display: "flex",
											justifyContent: "space-between",
											fontSize: "24px",
										},
										children: [
											{
												type: "div",
												props: {
													style: { display: "flex", gap: "18px", color: colors.amber },
													children: tags.slice(0, 4).map((tag) => ({
														type: "span",
														props: { children: `[${tag}]` },
													})),
												},
											},
											{
												type: "span",
												props: {
													style: { color: colors.dim },
													children: siteConfig.author,
												},
											},
										],
									},
								},
							],
						},
					},
				],
			},
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{ name: "JetBrains Mono", data: regular, weight: 400, style: "normal" },
				{ name: "JetBrains Mono", data: bold, weight: 700, style: "normal" },
			],
		},
	);

	const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
	return new Response(new Uint8Array(png), {
		headers: { "Content-Type": "image/png" },
	});
}
