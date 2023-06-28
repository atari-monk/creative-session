import * as PIXI from 'pixi.js';
import { AppHelper, BallObject, PlayerObject } from './index';
import { Renderer } from './Renderer';

export class BallRendererV1 extends Renderer {
  private ball: BallObject;
  private player: PlayerObject;

  constructor(appHelper: AppHelper, pixiApp: PIXI.Application<PIXI.ICanvas>) {
    super(appHelper, pixiApp);
    if (!this.appHelper.gameObjects || this.appHelper.gameObjects.length === 0)
      throw new Error('Array must be populated at this point!');
    this.ball = this.findBallObject();
    this.player = this.findPlayerObject();
  }

  private findBallObject() {
    return this.appHelper.gameObjects.find(
      (obj) => obj instanceof BallObject
    ) as BallObject;
  }

  private findPlayerObject() {
    return this.appHelper.gameObjects.find(
      (obj) => obj instanceof PlayerObject && obj.isPlayable
    ) as PlayerObject;
  }

  public render(deltaTime: number) {
    super.render(deltaTime);
    this.ball.handleCollisions(this.player);
  }
}
