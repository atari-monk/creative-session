import { GameObject } from './GameObject.js';

export class PixiRectangle extends GameObject {
  #pixiApp;
  #rectangle;

  constructor(pixiApp) {
    super();
    this.#pixiApp = pixiApp;
    this.#rectangle = null;
  }

  draw(stage) {
    const screenWidth = this.#pixiApp.screen.width;
    const screenHeight = this.#pixiApp.screen.height;

    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2;

    const rectangleWidth = 200;
    const rectangleHeight = 200;

    // eslint-disable-next-line no-undef
    this.#rectangle = new PIXI.Graphics();
    this.#rectangle.beginFill(0xff0000);
    this.#rectangle.drawRect(
      centerX - rectangleWidth / 2,
      centerY - rectangleHeight / 2,
      rectangleWidth,
      rectangleHeight
    );
    this.#rectangle.endFill();

    stage.addChild(this.#rectangle);
  }
}
