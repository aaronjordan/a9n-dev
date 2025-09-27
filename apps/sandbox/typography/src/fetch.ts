import template from "./index.html" with { type: "text" };
import { render } from "./render";

export async function fetch(this: Bun.Server, request: Request) {
  const wss = this.upgrade(request);
  if (wss) return undefined;

  const url = new URL(request.url);
  if (url.pathname.startsWith("/public") && !url.pathname.includes("..")) {
    const asset = Bun.file(`${import.meta.dir}${url.pathname}`);
    if (await asset.exists()) return new Response(asset);
    return new Response("Asset not found", { status: 404 });
  }

  assertIsString(template);
  const page = await render(template, url);
  return new Response(page, { headers: { "Content-Type": "text/html" } });
}

function assertIsString(x: unknown): asserts x is string {
  if (typeof x !== "string") {
    throw TypeError(`Expected string, but type was ${typeof x}`);
  }
}
