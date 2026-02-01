import type * as hast from "hast";

/**
 * Builds form-based tab structure for code groups.
 *
 * @param id the id for the whole code group
 * @param names the names for each following code group
 */
export function buildCodeGroupTabs(id: string, names: string[]): hast.Element {
	return {
		type: "element",
		tagName: "fieldset",
		properties: { class: "cg-tabs" },
		children: [...build(id, names)],
	};
}

/**
 * Builds a list of tab instances, given their `names`.
 */
function build(id: string, names: string[]): hast.Element[] {
	if (!names.length) return [];
	return [
		...build(id, names.slice(0, -1)),
		tab(id, names.length, names[names.length - 1]),
	];
}

/**
 * Builds a single tab, given its `name`.
 */
function tab(id: string, key: number, name: string): hast.Element {
	return {
		type: "element",
		tagName: "label",
		properties: {},
		children: [
			{
				type: "element",
				tagName: "input",
				properties: { type: "radio", name: id, value: key.toString() },
				children: [],
			},
			{
				type: "text",
				value: name,
			},
		],
	};
}
