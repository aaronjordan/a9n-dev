async function main() {
  const ws = new WebSocket("ws://localhost:4020");
  ws.addEventListener("open", () => console.log("* will reload on changes..."));
  ws.addEventListener("close", () => console.log("* closed conn"));
  ws.addEventListener("message", (e) => {
    if (e.data === "reload") window.location.reload();
  });
}

main();
