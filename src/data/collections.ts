import { getCollection, type CollectionEntry } from "astro:content";

/** Published posts, newest first. Drafts stay visible in `astro dev` only. */
export async function getPublishedPosts(): Promise<CollectionEntry<"blog">[]> {
	const posts = await getCollection("blog", ({ data }) => import.meta.env.DEV || !data.draft);
	return posts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

export async function getAllProjects(): Promise<CollectionEntry<"projects">[]> {
	const projects = await getCollection("projects");
	return projects.sort((a, b) => a.data.order - b.data.order);
}

export async function getFeaturedProjects(): Promise<CollectionEntry<"projects">[]> {
	return (await getAllProjects()).filter((p) => p.data.featured);
}

/** Unique tags across published posts with usage counts, most-used first. */
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
	const posts = await getPublishedPosts();
	const counts = new Map<string, number>();
	for (const post of posts) {
		for (const tag of post.data.tags) {
			counts.set(tag, (counts.get(tag) ?? 0) + 1);
		}
	}
	return [...counts.entries()]
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
