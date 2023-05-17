import { Renderer } from './Renderer.js';

export class App {
  #canvas;
  #backgroundColor;
  #fullScreen;
  #width;
  #height;
  #gameObjects = [];
  #pixiApp;
  #renderer;

  constructor(options = {}) {
    const { canvasId, backgroundColor, width, height, fullScreen } = options;

    this.#canvas = document.getElementById(canvasId);
    this.#backgroundColor = backgroundColor;
    this.#fullScreen = fullScreen;
    this.#width = width;
    this.#height = height;

    this.#createApp();
    this.#renderer = new Renderer(
      this,
      this.#pixiApp,
      this.#width,
      this.#height,
      this.#backgroundColor
    );
    this.#resizeCanvas();
  }

  #createApp() {
    this.#setCanvasStyles();
    const appOptions = this.#getAppOptions();
    // eslint-disable-next-line no-undef
    this.#pixiApp = new PIXI.Application(appOptions);
    this.#pixiApp.stage.sortableChildren = true;
  }

  #setCanvasStyles() {
    this.#canvas.style.position = 'absolute';
    this.#canvas.style.top = '50%';
    this.#canvas.style.left = '50%';
    this.#canvas.style.transform = 'translate(-50%, -50%)';
    const full = '100%';
    this.#canvas.style.width = this.#fullScreen ? full : `${this.#width}`;
    this.#canvas.style.height = this.#fullScreen ? full : `${this.#height}`;
    this.#canvas.style.border = this.#fullScreen ? 'none' : '2px solid white';
  }

  #getAppOptions() {
    const appOptions = {
      view: this.#canvas,
      backgroundColor: this.#backgroundColor,
    };

    if (this.#fullScreen) {
      appOptions.resizeTo = window;
      this.#width = window.innerWidth;
      this.#height = window.innerHeight;
    } else {
      appOptions.width = this.#width;
      appOptions.height = this.#height;
    }

    return appOptions;
  }

  startAnimationLoop() {
    this.#pixiApp.ticker.add((deltaTime) => {
      this.#renderer.render(deltaTime);
    });
  }

  #resizeCanvas() {
    window.addEventListener('resize', () => {
      if (this.#fullScreen) {
        this.#width = window.innerWidth;
        this.#height = window.innerHeight;
      }
      this.#pixiApp.renderer.resize(this.#width, this.#height);
    });
  }

  addGameObject(gameObject) {
    this.#gameObjects.push(gameObject);
  }

  removeGameObject(gameObject) {
    const index = this.#gameObjects.indexOf(gameObject);
    if (index !== -1) {
      this.#gameObjects.splice(index, 1);
    }
  }

  get canvas() {
    return this.#canvas;
  }

  get backgroundColor() {
    return this.#backgroundColor;
  }

  set backgroundColor(value) {
    this.#backgroundColor = value;
  }

  get fullScreen() {
    return this.#fullScreen;
  }

  set fullScreen(value) {
    this.#fullScreen = value;
  }

  get width() {
    return this.#width;
  }

  set width(value) {
    this.#width = value;
  }

  get height() {
    return this.#height;
  }

  set height(value) {
    this.#height = value;
  }

  get gameObjects() {
    return this.#gameObjects;
  }
}
