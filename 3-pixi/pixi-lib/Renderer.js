export class Renderer {
  #appHelper;
  #pixiApp;
  #width;
  #height;
  #backgroundColor;

  constructor(appHelper, pixiApp, options = {}) {
    this.#appHelper = appHelper;
    this.#pixiApp = pixiApp;

    const { width, height, backgroundColor } = options;
    this.#width = width;
    this.#height = height;
    this.#backgroundColor = backgroundColor;
  }

  renderBackground() {
    // eslint-disable-next-line no-undef
    const background = new PIXI.Graphics();
    background.beginFill(this.#backgroundColor);
    background.drawRect(0, 0, this.#width, this.#height);
    background.endFill();
    return background;
  }

  updateAndDrawGameObjects(deltaTime) {
    for (const gameObject of this.#appHelper.gameObjects) {
      gameObject.update(deltaTime);
      gameObject.draw(this.#pixiApp.stage);
    }
  }

  render(deltaTime) {
    this.#pixiApp.stage.removeChildren();
    //this.#pixiApp.stage.addChild(this.renderBackground());
    this.updateAndDrawGameObjects(deltaTime);
    //this.#pixiApp.renderer.render(this.#pixiApp.stage);
  }
}
