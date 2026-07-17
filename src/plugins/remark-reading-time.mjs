import { toString } from "mdast-util-to-string";

const WORDS_PER_MINUTE = 215;

/** Injects `minutesRead` (integer, min 1) into every page's frontmatter. */
export function remarkReadingTime() {
	return (tree, { data }) => {
		const words = toString(tree).split(/\s+/).filter(Boolean).length;
		data.astro.frontmatter.minutesRead = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
	};
}
