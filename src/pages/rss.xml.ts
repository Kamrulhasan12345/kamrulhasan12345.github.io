import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPosts } from "@/content.config";

export async function GET(context: APIContext) {
	const posts = await getPosts();
	return rss({
		title: "Mohammad Kamrul Hasan",
		description: "Writing on AI engineering, embedded systems, and compilers.",
		site: context.site!,
		trailingSlash: true,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishDate,
			link: `/blog/${post.id}/`,
			content: post.rendered?.html,
			categories: [...post.data.tags],
		})),
	});
}
