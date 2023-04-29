// app.js
const peer = new SimplePeer({
  initiator: location.hash === "#initiator",
  trickle: false,
});

peer.on("signal", (data) => {
  console.log("Signal data:", data);
  document.getElementById("offer").value = JSON.stringify(data);
});

peer.on("connect", () => {
  console.log("Connected!");
});

peer.on("data", (data) => {
  console.log("Received:", data.toString());
  document.getElementById("messages").innerHTML += `<p>${data.toString()}</p>`;
});

document.getElementById("sendButton").addEventListener("click", () => {
  const message = document.getElementById("messageInput").value;
  peer.send(message);
  document.getElementById(
    "messages"
  ).innerHTML += `<p><strong>You:</strong> ${message}</p>`;
});
