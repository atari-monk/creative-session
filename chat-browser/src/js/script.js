const p = new window.SimplePeer({
  initiator: location.hash === "#1",
  trickle: false,
});

p.on("error", (err) => console.log("error", err));

p.on("signal", (data) => {
  console.log("SIGNAL", JSON.stringify(data));
  document.querySelector("#outgoing").textContent = JSON.stringify(data);
});

document.querySelector("form").addEventListener("submit", (ev) => {
  ev.preventDefault();
  p.signal(JSON.parse(document.querySelector("#connect-msg").value));
});

p.on("connect", () => {
  console.log("CONNECT");
  p.send("whatever" + Math.random());

  // send message
  document.querySelector("#send-btn").addEventListener("click", (ev) => {
    const msg = document.querySelector("#outgoing-msg").value;
    p.send(msg);
    document.querySelector("#outgoing-msg").value = "";
  });
});

p.on("data", (data) => {
  console.log("data: " + data);
  // display incoming message
  const pre = document.createElement("pre");
  pre.textContent = data;
  document.querySelector("#outgoing").appendChild(pre);
});
