import * as PIXI from 'pixi.js';
import { GenericGameObject } from './GenericGameObject';

export class PixiRectangle extends GenericGameObject {
  private readonly pixiApp: PIXI.Application;
  private rectangle: PIXI.Graphics | null;

  constructor(pixiApp: PIXI.Application) {
    super();
    this.pixiApp = pixiApp;
    this.rectangle = null;
  }

  public draw(stage: PIXI.Container): void {
    const screenWidth = this.pixiApp.screen.width;
    const screenHeight = this.pixiApp.screen.height;

    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2;

    const rectangleWidth = 200;
    const rectangleHeight = 200;

    this.rectangle = new PIXI.Graphics();
    this.rectangle.beginFill(0xff0000);
    this.rectangle.drawRect(
      centerX - rectangleWidth / 2,
      centerY - rectangleHeight / 2,
      rectangleWidth,
      rectangleHeight
    );
    this.rectangle.endFill();

    stage.addChild(this.rectangle);
  }
}
