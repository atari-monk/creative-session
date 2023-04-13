import { Player } from "./Player.js";
import { Spear } from "./Spear.js";

export class Game {
  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.entities = [];
    this.lastUpdateTime = 0;
    this.player = null;
    this.spear = null;
    // Bind the update method so it can be used as an event listener
    this.update = this.update.bind(this);
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

  addEntity(entity) {
    this.entities.push(entity);

    // If the entity is a player or a spear, set it as the game's player or spear
    if (entity instanceof Player) {
      this.player = entity;
    }
    if (entity instanceof Spear) {
      this.spear = entity;
    }
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.lastUpdateTime = performance.now();
      requestAnimationFrame(this.update);
    }
  }

  pause() {
    this.isRunning = false;
  }

  reset() {
    // Reset game state here
  }

  update(currentTime) {
    if (!this.isRunning) {
      return;
    }

    const deltaTime = currentTime - this.lastUpdateTime;
    this.lastUpdateTime = currentTime;

    // Update game state here
    // Update each entity
    for (const entity of this.entities) {
      entity.update(deltaTime);
    }
    // Update the player
    if (this.keyboard.isKeyDown("Space")) {
      this.player.jump();
    }
    this.player.pickUpSpear(this.spear);
    if (this.keyboard.isKeyDown("KeyC")) {
      this.player.releaseSpear();
    }

    // Draw game graphics here
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const entity of this.entities) {
      entity.draw(this.ctx);
    }

    requestAnimationFrame(this.update);
  }
}
