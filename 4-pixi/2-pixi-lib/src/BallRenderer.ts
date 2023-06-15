import * as PIXI from 'pixi.js';
import { AppHelper } from './AppHelper';
import { BallObject } from './BallObject';
import { PlayerObject } from './PlayerObject';
import { Renderer } from './Renderer';

export class BallRenderer extends Renderer {
  private ball: BallObject;
  private player: PlayerObject;

  constructor(appHelper: AppHelper, pixiApp: PIXI.Application<PIXI.ICanvas>) {
    super(appHelper, pixiApp);
    if (!this.appHelper.gameObjects || this.appHelper.gameObjects.length === 0)
      throw new Error('Array must be populated at this point!');
    this.ball = this.findBallObject();
    this.player = this.findPlayerObject();
  }

  private findBallObject(): BallObject {
    return this.appHelper.gameObjects.find(
      (obj) => obj instanceof BallObject
    ) as BallObject;
  }

  private findPlayerObject(): PlayerObject {
    return this.appHelper.gameObjects.find(
      (obj) => obj instanceof PlayerObject && obj.isPlayable
    ) as PlayerObject;
  }

  public render(deltaTime: number) {
    super.render(deltaTime);
    this.ball.handleCollisions(this.player);
  }
}
