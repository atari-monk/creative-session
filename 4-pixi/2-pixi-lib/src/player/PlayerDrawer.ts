import * as PIXI from 'pixi.js';
import { IBasicRenderer } from '../IBasicRenderer';
import { inject, injectable } from 'inversify';
import { SharedTypes } from '../data/appConfig';
import { IColorOptions } from '../data/configTypes';
import { IPlayerRenderer } from './IPlayerRenderer';
import { IPlayer } from './IPlayer';

@injectable()
export class PlayablePlayerDrawer implements IPlayerRenderer {
  constructor(
    @inject(SharedTypes.BasicRenderer)
    private readonly renderer: IBasicRenderer
  ) {}

  draw(
    stage: PIXI.Container<PIXI.DisplayObject>,
    gameObj: IPlayer,
    colors: IColorOptions
  ): void {
    this.renderer.drawCircle(
      stage,
      colors.player,
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
    this.renderer.drawLine(
      stage,
      colors.direction,
      2,
      gameObj.position.x,
      gameObj.position.y,
      gameObj.direction.x,
      gameObj.direction.y,
      gameObj.radius / 2
    );
  }
}
