import * as PIXI from 'pixi.js';
import { IBasicRenderer } from '../IBasicRenderer';
import { inject, injectable } from 'inversify';
import { SharedTypes } from '../data/appConfig';
import { IColorOptions } from '../data/configTypes';
import { IBall } from './IBall';
import { IBallRenderer } from './IBallRenderer';

@injectable()
export class BallRenderer implements IBallRenderer {
  constructor(
    @inject(SharedTypes.BasicRenderer)
    private readonly renderer: IBasicRenderer
  ) {}

  draw(
    stage: PIXI.Container<PIXI.DisplayObject>,
    gameObj: IBall,
    colors: IColorOptions
  ): void {
    this.renderer.drawCircle(
      stage,
      colors.body,
      gameObj.position.x,
      gameObj.position.y,
      gameObj.radius
    );
    this.renderer.drawCircle(
      stage,
      colors.position,
      gameObj.position.x,
      gameObj.position.y,
      2
    );
  }
}
