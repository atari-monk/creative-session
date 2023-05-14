export class App {
  constructor(options = {}) {
    const { canvasId, backgroundColor, width, height, fullScreen, log } =
      options;
    log && console.log('options: ', options);

    this.canvas = document.getElementById(canvasId);
    this.backgroundColor = backgroundColor;
    this.fullScreen = fullScreen;
    this.width = width;
    this.height = height;
    this.log = log;
    this.gameObjects = [];

    this.createApp();
    this.startAnimationLoop();
    this.resizeCanvas();
  }

  createApp() {
    this.setCanvasStyles();
    const appOptions = this.getAppOptions();
    this.app = new PIXI.Application(appOptions);
    this.app.stage.sortableChildren = true;
    this.log && console.log(`createApp - width: ${this.width}, ${this.height}`);
  }

  setCanvasStyles() {
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '50%';
    this.canvas.style.left = '50%';
    this.canvas.style.transform = 'translate(-50%, -50%)';
    const full = '100%';
    this.canvas.style.width = this.fullScreen ? full : `${this.width}`;
    this.canvas.style.height = this.fullScreen ? full : `${this.height}`;
    this.canvas.style.border = this.fullScreen ? 'none' : '2px solid white';
  }

  getAppOptions() {
    const appOptions = {
      view: this.canvas,
      backgroundColor: this.backgroundColor,
    };

    if (this.fullScreen) {
      appOptions.resizeTo = window;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    } else {
      appOptions.width = this.width;
      appOptions.height = this.height;
    }

    return appOptions;
  }

  startAnimationLoop() {
    this.app.ticker.add((deltaTime) => {
      this.app.stage.removeChildren();

      const background = new PIXI.Graphics();
      background.beginFill(this.backgroundColor);
      background.drawRect(0, 0, this.width, this.height);
      background.endFill();
      this.app.stage.addChild(background);

      this.gameObjects.forEach((gameObject) => {
        gameObject.update(deltaTime);
        gameObject.draw(this.app.stage);
      });

      this.app.renderer.render(this.app.stage);
    });
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

  addGameObject(gameObject) {
    this.gameObjects.push(gameObject);
  }

  removeGameObject(gameObject) {
    const index = this.gameObjects.indexOf(gameObject);
    if (index !== -1) {
      this.gameObjects.splice(index, 1);
    }
  }
}
