import { watch } from "fs";
import { fetch } from "./fetch";

declare global {
  var sockets: Bun.ServerWebSocket<unknown>[];
}
globalThis.sockets ??= [];

const PORT = process.env.PORT ?? 4020;

Bun.serve({
  fetch: fetch,
  port: PORT,
  websocket: {
    close(ws) {
      sockets.splice(sockets.indexOf(ws), 1);
    },
    message() {},
    open(ws) {
      sockets.push(ws);
    },
  },
});

console.log(`🍿 Reloaded dev server on`, PORT);

/**
 * Reload on server update or content update.
 */
function reloadPages() {
  for (const ws of sockets) {
    ws.send("reload");
  }
}
reloadPages();
watch(import.meta.dir + "/public", { recursive: true }, reloadPages);
watch(import.meta.dir + "/routes", { recursive: true }, reloadPages);
