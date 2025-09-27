import { parse } from "marked";

/**
 * The pattern used in `layout` to define where to put rendered markdown.
 */
const slot = "%%SLOT%%";

/**
 * Renders the markdown corresponding to `url`.
 *
 * @param layout The base HTML for the page containing a location to splice.
 * @param url The request URL
 * @returns The rendered HTML page
 */
export async function render(layout: string, url: URL): Promise<string> {
  const route = url.pathname;
  const path = route.endsWith("/") ? `${route}index.md` : `${route}.md`;

  const src = Bun.file(import.meta.dir + "/routes" + path);
  const contents = await parse(await src.text());
  return layout.replace(slot, contents);
}
