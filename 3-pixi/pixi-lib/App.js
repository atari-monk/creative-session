export class App {
  constructor(canvasId, width, height, backgroundColor) {
    this.canvas = document.getElementById(canvasId);
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;

    this.createApp();
    this.startAnimationLoop();
  }

  createApp() {
    this.app = new PIXI.Application({
      view: this.canvas,
      width: this.width,
      height: this.height,
      backgroundColor: this.backgroundColor,
    });
  }

  startAnimationLoop() {
    this.app.ticker.add(() => {});
  }
}
