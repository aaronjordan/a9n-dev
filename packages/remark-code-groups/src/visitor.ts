import type * as mdast from "mdast";
import type * as unified from "unified";
import { visit } from "unist-util-visit";

/**
 * Gets named group `key` and optional `value` for meta strings.
 */
const ParseMetaString = /(?<key>\w+)(="(?<value>.*?)")?/g;

/**
 * Marks successive code blocks that form a group with some metadata
 * contained in a leading HTML element.
 *
 * This is required to embed data for these `<pre>` elements since `shiki`
 * will wipe out any custom hProperties.
 */
export const remarkCodeGroups: unified.Plugin<[], mdast.Root> = () => {
	const ids = generateId();
	const nextId = () => ids.next().value as string;
	let appendName: undefined | ((name: string) => void);
	let lastIndex = -1;

	return (tree, file) => {
		visit(tree, "code", (node, index, parent) => {
			if (typeof index !== "number" || parent?.type !== "root") return;

			if (lastIndex + 1 !== index) {
				// stop tracking a group, if we were.
				appendName = undefined;
			}
			lastIndex = index;

			const metaString = node.meta;
			if (!metaString) return;
			const meta = getMetaFields(metaString);

			if ("group" in meta) {
				const res = spliceGroupLeader(index, parent, nextId);
				appendName = res.appendName;
				lastIndex++;
			}
			if ("title" in meta) appendName?.(meta.title);

			/* Advance past the inserted leader and this code block */
			return index + 2;
		});
	};
};

/**
 * Gets the meta fields present in the passed string.
 *
 * @param meta the raw meta text for the code block
 * @returns a dictionary of the key-value pairs, with key="" for empty values
 */
function getMetaFields(meta: string): Record<string, string> {
	const all = meta.matchAll(ParseMetaString);
	const props: Record<string, string> = {};

	for (const m of all) {
		const key = m.groups?.key;
		if (!key) continue;
		const value = m.groups?.value;
		props[key] = value ?? "";
	}

	return props;
}

/**
 * Adds a code group leader, which will become the parent node for these
 * code elements.
 *
 * @param index the index to prepend with the leader node
 * @param parent the node in which to write at the given index
 * @param nextId an ID-generating function
 */
function spliceGroupLeader(
	index: number,
	parent: mdast.Root,
	nextId: () => string,
): {
	appendName: (fileName: string) => void;
} {
	const groupNames: string[] = [];

	const hProperties = {
		dataCodeGroup: "",
		dataCodeGroupId: nextId(),
		dataCodeGroupNames: groupNames,
	};
	const leader: mdast.Paragraph = {
		type: "paragraph",
		data: { hName: "div", hProperties },
		children: [],
	};

	parent.children.splice(index, 0, leader);

	return { appendName: (name: string) => groupNames.push(name) };
}

function* generateId() {
	let i = 42;
	while (true) yield `cg${i++}`;
}
