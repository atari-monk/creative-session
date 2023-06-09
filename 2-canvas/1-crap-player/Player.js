// Define the player class
export class Player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 5;
    this.gravity = 0.5;
    this.velocity = 0;
    this.jumpPower = 12;
    this.isJumping = false;
    this.jumpStartTime = 0;
  }

  // Draw the player rectangle on the canvas
  draw(ctx) {
    ctx.fillStyle = "orange";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  // Move the player in response to keyboard input
  move(keyPressed) {
    switch (keyPressed) {
      case "w":
        if (!this.isJumping) {
          this.isJumping = true;
          this.jumpStartTime = Date.now();
          this.velocity = -this.jumpPower;
        }
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

  // Update the player position due to gravity
  update() {
    if (this.isJumping) {
      const elapsed = (Date.now() - this.jumpStartTime) / 1000;
      const yDelta =
        this.velocity * elapsed + 0.5 * this.gravity * elapsed * elapsed;
      this.y -= yDelta;
      this.velocity = -this.jumpPower + this.gravity * elapsed;
      if (this.y >= canvas.height - this.height) {
        this.isJumping = false;
        this.y = canvas.height - this.height;
      }
    } else {
      this.velocity += this.gravity;
      this.y += this.velocity;
      if (this.y >= canvas.height - this.height) {
        this.y = canvas.height - this.height;
        this.velocity = 0;
      }
    }
  }

  // Check if the player has collided with the bottom of the canvas
  checkCollision(canvasHeight) {
    if (this.y + this.height > canvasHeight) {
      this.y = canvasHeight - this.height;
      this.velocity = 0;
      this.isJumping = false;
    }
  }
}

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
