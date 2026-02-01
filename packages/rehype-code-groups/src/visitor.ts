import type * as hast from "hast";
import type * as unified from "unified";
import { visit } from "unist-util-visit";

import { buildCodeGroupTabs } from "./build-tabs";
import { extractCodeBlocksAtIndex } from "./extract-blocks";

export interface RehypeCodeGroupConfig {
	/**
	 * Class name to apply to the outer shell of a code group.
	 */
	class: string;
}

export const rehypeCodeGroups: unified.Plugin<
	[RehypeCodeGroupConfig],
	hast.Root
> = (config) => {
	return (tree) => {
		visit(tree, "element", (node, index, parent) => {
			if (
				typeof index !== "number" ||
				node.tagName !== "div" ||
				!parent ||
				!isCodeGroupLike(node.properties)
			) {
				return;
			}

			const id = node.properties.dataCodeGroupId;
			const names = node.properties.dataCodeGroupNames.split(" ");
			const files = {
				names,
				count: names.length,
				blocks: [] as hast.Element[],
			};
			files.blocks = extractCodeBlocksAtIndex(index, files.count, parent);

			node.properties.class = config.class;
			node.children = [buildCodeGroupTabs(id, files.names), ...files.blocks];

			// const metaString = `${node.lang ?? ""} ${node.meta ?? ""}`.trim();
			// if (!metaString) return;
			// const [title] = metaString.match(/(?<=title=("|'))(.*?)(?=("|'))/) ?? [
			// 	"",
			// ];
			// if (!title && metaString.includes("title=")) {
			// 	file.message("Invalid title", node, "remark-code-title");
			// 	return;
			// }
			// if (!title) return;

			// const titleNode: mdast.Paragraph = {
			// 	type: "paragraph",
			// 	data: {
			// 		hName: "div",
			// 		hProperties: {
			// 			"data-remark-code-title": true,
			// 			"data-language": node.lang,
			// 		},
			// 	},
			// 	children: [{ type: "text", value: title }],
			// };

			// parent.children.splice(index, 0, titleNode);
			// /* Skips this node (title) and the next node (code) */
			// return index + 2;
		});
	};
};

interface CodeGroupData extends hast.Properties {
	dataCodeGroup: string;
	dataCodeGroupId: string;
	dataCodeGroupNames: string;
}

function isCodeGroupLike(x: hast.Properties): x is CodeGroupData {
	return "dataCodeGroup" in x;
}
