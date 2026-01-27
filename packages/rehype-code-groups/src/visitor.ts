import type * as hast from "hast";
import type * as unified from "unified";
import { visit } from "unist-util-visit";

export const rehypeCodeGroups: unified.Plugin<[], hast.Root> = () => {
	return (tree, file) => {
		visit(tree, "element", (node, index, parent) => {
			if (node.tagName !== "div") return;
			if (!isCodeGroupLike(node.properties)) return;

			const fileNames = node.properties.dataCodeGroupNames.split(" ");
			node.properties.class = "font-mono";
			node.children = [{ type: "text", value: fileNames.join(", ") }];

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
