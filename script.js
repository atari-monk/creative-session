// Initialize the canvas and player
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const player = new Player(
  canvas.width / 2,
  canvas.height / 2,
  canvas.width * 0.1,
  canvas.height * 0.1
);

// Set canvas size based on viewport
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.9;
  player.width = canvas.width * 0.1;
  player.height = canvas.height * 0.1;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Listen for keyboard input and move the player accordingly
document.addEventListener("keydown", (event) => {
  const keyPressed = event.key.toLowerCase();
  player.move(keyPressed);
});

// Draw the player and update the canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  player.checkCollision(canvas.height);
  player.draw(ctx);
  requestAnimationFrame(draw);
}
draw();
