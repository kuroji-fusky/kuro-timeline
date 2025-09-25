console.log("it's me hi")

addEventListener("message", (msg) => {
  postMessage("just got back some cringe:", msg.data)
})