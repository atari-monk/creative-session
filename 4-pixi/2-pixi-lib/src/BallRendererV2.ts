import * as PIXI from 'pixi.js';
import { AppHelper, BallObject } from './index';
import { Renderer } from './Renderer';
import { Player } from './player/Player';
import { ISteerablePlayer } from './player/ISteerablePlayer';

export class BallRendererV2 extends Renderer {
  private ball: BallObject;
  private player: ISteerablePlayer;

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
      (obj) => obj instanceof Player && obj.isPlayable
    ) as Player;
  }

  public render(deltaTime: number) {
    super.render(deltaTime);
    this.ball.handleCollisions(this.player);
  }
}
