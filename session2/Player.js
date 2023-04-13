export class Player {
  constructor(x, y, width, height, color, canvas, keyboard) {
    this.keyboard = keyboard;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.velocityX = 0;
    this.velocityY = 0;
    this.gravity = 0.5;

    // Constants for the jump
    this.jumpVelocity = -10;
    this.maxJumpHeight = 100;
    this.jumpTime = 0.6;

    // State variables for the jump
    this.isJumping = false;
    this.jumpStartY = 0;
    this.jumpStartTime = 0;
    this.jumpEndTime = 0;
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.jumpStartY = this.y;
      this.jumpStartTime = performance.now();
      this.jumpEndTime = this.jumpStartTime + this.jumpTime * 1000;
      this.velocityY = this.jumpVelocity;
    }
  }

  update() {
    // Update the player's position based on keyboard input
    if (this.keyboard.isKeyDown("KeyW")) {
      this.velocityY = -10;
    }
    if (this.keyboard.isKeyDown("KeyS")) {
      this.velocityY = 10;
    }
    if (this.keyboard.isKeyDown("KeyA")) {
      this.velocityX = -5;
    }
    if (this.keyboard.isKeyDown("KeyD")) {
      this.velocityX = 5;
    }

    if (this.isJumping) {
      const currentTime = performance.now();
      const jumpProgress =
        (currentTime - this.jumpStartTime) /
        (this.jumpEndTime - this.jumpStartTime);
      const jumpHeight = this.maxJumpHeight * Math.sin(Math.PI * jumpProgress);

      if (currentTime >= this.jumpEndTime) {
        this.isJumping = false;
        this.velocityY = 0;
      } else {
        this.velocityY =
          this.jumpVelocity + (this.gravity * jumpHeight) / this.maxJumpHeight;
      }
    } else {
      // Apply gravity
      this.velocityY += this.gravity;
    }

    // Update position
    this.x += this.velocityX;
    this.y += this.velocityY;

    // Check for collisions with the ground
    if (this.y + this.height > this.canvas.height) {
      this.y = this.canvas.height - this.height;
      this.velocityY = 0;
      this.isJumping = false;
    }

    // Keep the player within the bounds of the canvas
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.width > this.canvas.width) {
      this.x = this.canvas.width - this.width;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y + this.height > this.canvas.height) {
      this.y = this.canvas.height - this.height;
    }
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  isCollidingWith(other) {
    // Check if this player is colliding with another object
    if (
      this.x + this.width > other.x &&
      this.x < other.x + other.width &&
      this.y + this.height > other.y &&
      this.y < other.y + other.height
    ) {
      return true;
    }
    return false;
  }
}
