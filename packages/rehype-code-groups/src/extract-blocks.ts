import type * as hast from "hast";

/**
 * Pulls `count` code blocks out of the children for `parent`, seeking them
 * after the current `index`, which should be the index of the marker added by
 * `remark-code-groups`.
 *
 * @param index The index of the marker HTML node
 * @param count The number of code blocks to collect and extract
 * @param parent The shared parent node of the marker and the `pre` elements
 * @returns A list of the `pre` elements, while extracting them from the original `parent`
 */
export function extractCodeBlocksAtIndex(
	index: number,
	count: number,
	parent: hast.Root | hast.Element,
): hast.Element[] {
	return collect(index + 1, count, parent.children);
}

/**
 * Code Group `<pre>` element collector.
 *
 * @param i the index to begin searching from
 * @param c the count of nodes remaining to pick
 * @param all the collection of children to read from
 * @returns all code blocks in this code group
 */
function collect(
	i: number,
	c: number,
	all: hast.RootContent[] | hast.ElementContent[],
): hast.Element[] {
	if (!c) return [];
	if (isCodeBlock(all[i]))
		return [all.splice(i, 1)[0] as hast.Element, ...collect(i, c - 1, all)];
	if (isWhitespace(all[i])) return collect(i + 1, c, all);
	return [];
}

function isCodeBlock(
	node: hast.RootContent | hast.ElementContent,
): node is hast.Element & { tagName: "pre" } {
	return node.type === "element" && node.tagName === "pre";
}

/**
 * Returns true only if `node` is only whitespace.
 */
function isWhitespace(node: hast.RootContent | hast.ElementContent): boolean {
	return node.type === "text" && !node.value.trim();
}
