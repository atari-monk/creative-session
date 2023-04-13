// Define the player class
class Player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 5;
  }

  // Draw the player rectangle on the canvas
  draw(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  // Move the player in response to keyboard input
  move(keyPressed) {
    switch (keyPressed) {
      case "w":
        this.y -= this.speed;
        break;
      case "s":
        this.y += this.speed;
        break;
      case "a":
        this.x -= this.speed;
        break;
      case "d":
        this.x += this.speed;
        break;
    }
  }
}

// Initialize the canvas and player
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const player = new Player(50, 50, 50, 50);

// Listen for keyboard input and move the player accordingly
document.addEventListener("keydown", (event) => {
  const keyPressed = event.key.toLowerCase();
  player.move(keyPressed);
});

// Draw the player and update the canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);
  requestAnimationFrame(draw);
}
draw();
