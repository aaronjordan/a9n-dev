import { fetch } from "./fetch";

declare global {
  var sockets: Bun.ServerWebSocket<unknown>[];
}

globalThis.sockets ??= [];

const PORT = process.env.PORT ?? 4020;

const server = Bun.serve({
  fetch: fetch,
  port: PORT,
  websocket: {
    close(ws) {
      console.log("💻 Client disconnected");
      sockets.splice(sockets.indexOf(ws), 1);
    },
    message() {},
    open(ws) {
      console.log("💻 Client connected");
      sockets.push(ws);
    },
  },
});

console.log(`🍿 Reloaded dev server on`, PORT);
// perform live reloads
for (const ws of sockets) {
  ws.send("reload");
  console.log("push");
}
