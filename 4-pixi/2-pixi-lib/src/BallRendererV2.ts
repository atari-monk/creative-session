import * as PIXI from 'pixi.js';
import { AppHelper, BallObject } from './index';
import { Renderer } from './Renderer';
import { PlayablePlayer } from './player/PlayablePlayer';
import { IPlayablePlayer } from './player/IPlayablePlayer';

export class BallRendererV2 extends Renderer {
  private ball: BallObject;
  private player: IPlayablePlayer;

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
      (obj) => obj instanceof PlayablePlayer && obj.isPlayable
    ) as PlayablePlayer;
  }

  public render(deltaTime: number) {
    super.render(deltaTime);
    this.ball.handleCollisions(this.player);
  }
}
