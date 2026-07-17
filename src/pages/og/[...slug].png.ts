import { readFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import type { APIContext } from "astro";
import satori from "satori";
import { getPublishedPosts } from "@/data/collections";
import { siteConfig } from "@/site.config";

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
	bg: "#101418",
	card: "#14191e",
	line: "#262c34",
	text: "#ced3d9",
	heading: "#eef1f4",
	dim: "#949ba3",
	accent: "#8ab4d8",
	amber: "#e0b775",
};

export async function GET({ props }: APIContext) {
	const { title, tags } = props as { title: string; tags: string[] };

	const [regular, semibold, pixel] = await Promise.all([
		readFile("src/assets/fonts/Inter-Regular.woff"),
		readFile("src/assets/fonts/Inter-SemiBold.woff"),
		readFile("src/assets/fonts/Silkscreen-Regular.woff"),
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
					justifyContent: "space-between",
					backgroundColor: colors.bg,
					padding: "72px",
					fontFamily: "Inter",
				},
				children: [
					{
						type: "div",
						props: {
							style: {
								display: "flex",
								alignItems: "center",
								gap: "14px",
								fontSize: "24px",
								color: colors.dim,
							},
							children: [
								{
									type: "div",
									props: {
										style: {
											width: "14px",
											height: "14px",
											borderRadius: "3px",
											backgroundColor: colors.accent,
										},
									},
								},
								{ type: "span", props: { children: siteConfig.author } },
							],
						},
					},
					{
						type: "div",
						props: {
							style: {
								display: "flex",
								fontFamily: "Silkscreen",
								fontSize: title.length > 60 ? "40px" : "50px",
								color: colors.heading,
								lineHeight: 1.35,
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
								alignItems: "center",
								fontSize: "24px",
							},
							children: [
								{
									type: "div",
									props: {
										style: { display: "flex", gap: "14px", color: colors.amber },
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
										children: siteConfig.role,
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
				{ name: "Inter", data: regular, weight: 400, style: "normal" },
				{ name: "Inter", data: semibold, weight: 600, style: "normal" },
				{ name: "Silkscreen", data: pixel, weight: 400, style: "normal" },
			],
		},
	);

	const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
	return new Response(new Uint8Array(png), {
		headers: { "Content-Type": "image/png" },
	});
}
