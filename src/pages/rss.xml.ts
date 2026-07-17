import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPublishedPosts } from "@/data/collections";
import { siteConfig } from "@/site.config";

export async function GET(context: APIContext) {
	const posts = await getPublishedPosts();
	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
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
