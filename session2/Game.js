import { Keyboard } from "./Keyboard.js";

export class Game {
  constructor() {
    this.keyboard = new Keyboard();
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.isRunning = false;

    // Bind event listeners to buttons
    this.startBtn = document.getElementById("start-btn");
    this.pauseBtn = document.getElementById("pause-btn");
    this.resetBtn = document.getElementById("reset-btn");
    this.startBtn.addEventListener("click", this.start.bind(this));
    this.pauseBtn.addEventListener("click", this.pause.bind(this));
    this.resetBtn.addEventListener("click", this.reset.bind(this));
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.loop();
    }
  }

  pause() {
    this.isRunning = false;
  }

  reset() {
    // Reset game state here
  }

  loop() {
    if (!this.isRunning) {
      return;
    }

    // Update game state here
    this.player.update();
    // Update the player
    if (this.keyboard.isKeyDown("Space")) {
      this.player.jump();
    }
    if (this.player.isCollidingWith(this.spear)) {
      console.log("Player hit by spear!");
    }

    // Draw game graphics here
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx);

    // Update and draw the spear
    this.spear.update();
    // Check for collisions between the player and spear
    if (this.spear.isCollidingWith(this.player)) {
      console.log("Spear hit by player!");
    }
    this.spear.draw();

    requestAnimationFrame(this.loop.bind(this));
  }

  getCanvas() {
    return this.canvas;
  }
}
