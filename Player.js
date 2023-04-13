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
  }

  // Draw the player rectangle on the canvas
  draw(ctx) {
    ctx.fillStyle = "red";
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

  // Update the player position due to gravity
  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
  }

  // Check if the player has collided with the bottom of the canvas
  checkCollision(canvasHeight) {
    if (this.y + this.height > canvasHeight) {
      this.y = canvasHeight - this.height;
      this.velocity = 0;
    }
  }
}
