import { visit } from "unist-util-visit";

/**
 * Turns remark-directive containers into styled asides:
 *
 *   :::warning
 *   Don't run this on hardware you care about.
 *   :::
 *
 * Supported: note, tip, warning. Labels get a terminal-flavored sigil.
 */
const KINDS = {
	note: "[*] NOTE",
	tip: "[+] TIP",
	warning: "[!] WARNING",
};

export function remarkAdmonitions() {
	return (tree) => {
		visit(tree, "containerDirective", (node) => {
			const label = KINDS[node.name];
			if (!label) return;

			node.data ??= {};
			node.data.hName = "aside";
			node.data.hProperties = {
				class: `admonition admonition--${node.name}`,
			};
			node.children.unshift({
				type: "paragraph",
				data: {
					hName: "span",
					hProperties: { class: "admonition-label", "aria-hidden": "false" },
				},
				children: [{ type: "text", value: label }],
			});
		});
	};
}
