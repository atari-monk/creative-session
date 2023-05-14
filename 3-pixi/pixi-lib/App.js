export class App {
  constructor(options = {}) {
    const { canvasId, backgroundColor, width, height, fullScreen, log } =
      options;

    this.log && console.log('options: ', options);

    this.canvas = document.getElementById(canvasId);
    this.backgroundColor = backgroundColor;
    this.fullScreen = fullScreen;
    this.width = width;
    this.height = height;
    this.log = log;

    this.createApp();
    this.startAnimationLoop();
    this.resizeCanvas();
  }

  createApp() {
    const appOptions = {
      view: this.canvas,
      backgroundColor: this.backgroundColor,
    };

    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '50%';
    this.canvas.style.left = '50%';
    this.canvas.style.transform = 'translate(-50%, -50%)';
    const full = '100%';
    this.canvas.style.width = this.fullScreen ? full : `${this.width}`;
    this.canvas.style.height = this.fullScreen ? full : `${this.height}`;

    this.canvas.style.border = this.fullScreen ? 'none' : '2px solid white';

    if (this.fullScreen) {
      appOptions.resizeTo = window;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    } else {
      appOptions.width = this.width;
      appOptions.height = this.height;
    }

    this.log && console.log(`createApp - width: ${this.width}, ${this.height}`);
    this.app = new PIXI.Application(appOptions);
  }

  startAnimationLoop() {
    this.app.ticker.add(() => {});
  }

  resizeCanvas() {
    window.addEventListener('resize', () => {
      if (this.fullScreen) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
      }
      this.app.renderer.resize(this.width, this.height);
      this.log &&
        console.log(`resizeCanvas - width: ${this.width}, ${this.height}`);
    });
  }
}
