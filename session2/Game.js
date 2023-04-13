export class Game {
  #player;

  constructor(player) {
    this.#player = player;
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
    // Draw game graphics here
    this.#player.draw(this.ctx);
    requestAnimationFrame(this.loop.bind(this));
  }
}
