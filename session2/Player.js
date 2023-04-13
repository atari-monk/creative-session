export class Player {
  constructor(x, y, width, height, color, canvas) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.canvas = canvas;

    // Add vertical velocity and acceleration for gravity
    this.velocityY = 0;
    this.accelerationY = 0.5; // Adjust this value to change the strength of gravity
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    // Apply gravity to the player's vertical velocity
    this.velocityY += this.accelerationY;

    // Update the player's position based on its velocity
    this.y += this.velocityY;

    // Stop the player from falling through the floor
    if (this.y + this.height > this.canvas.height) {
      this.y = this.canvas.height - this.height;
      this.velocityY = 0;
    }
  }
}
