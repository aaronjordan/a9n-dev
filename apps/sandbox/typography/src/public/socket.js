async function main() {
  const ws = new WebSocket("ws://localhost:4020");
  ws.addEventListener("open", () => console.log("opened"));
  ws.addEventListener("close", () => console.log("closed"));
  ws.addEventListener("message", (e) => {
    if (e.data === "reload") window.location.reload();
  });
}

main();
