export class Game {
  constructor() {
    this.objects = [];
    this.paused = true;
    this.lastTimestamp = null;

    // Add event listeners for start, reset, and overlay button click events
    document.getElementById("start").addEventListener("click", () => {
      this.start();
    });

    document.getElementById("reset").addEventListener("click", () => {
      this.reset();
    });

    document.getElementById("small-button").addEventListener("click", () => {
      this.pause();
    });
  }

  addObject(obj) {
    this.objects.push(obj);
  }

  start() {
    this.paused = false;
    requestAnimationFrame(this.update.bind(this));
  }

  pause() {
    this.paused = true;
  }

  reset() {
    this.objects = [];
  }

  update(timestamp) {
    if (this.lastTimestamp === null) {
      this.lastTimestamp = timestamp;
    }

    const delta = (timestamp - this.lastTimestamp) / 1000;
    this.lastTimestamp = timestamp;

    if (!this.paused) {
      // Update game objects using delta time
      for (let obj of this.objects) {
        obj.update(delta);
      }

      // Render game objects
      for (let obj of this.objects) {
        obj.render();
      }

      // Call update again on next frame
      requestAnimationFrame(this.update.bind(this));
    }
  }
}
