import { AppHelper } from './AppHelper.js';
import * as PIXI from 'pixi.js';

export class Renderer {
  protected appHelper: AppHelper;
  private pixiApp: PIXI.Application<PIXI.ICanvas>;

  constructor(appHelper: AppHelper, pixiApp: PIXI.Application<PIXI.ICanvas>) {
    this.appHelper = appHelper;
    this.pixiApp = pixiApp;
  }

  public render(deltaTime: number) {
    this.pixiApp.stage.removeChildren();
    this.updateAndDrawGameObjects(deltaTime);
  }

  private updateAndDrawGameObjects(deltaTime: number) {
    for (const gameObject of this.appHelper.gameObjects) {
      gameObject.update(deltaTime);
      gameObject.draw(this.pixiApp.stage);
    }
  }
}
