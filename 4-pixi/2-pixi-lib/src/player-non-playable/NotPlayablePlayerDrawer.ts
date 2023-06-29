import * as PIXI from 'pixi.js';
import { IBasicRenderer } from '../IBasicRenderer';
import { inject, injectable } from 'inversify';
import { SharedTypes } from '../data/appConfig';
import { IColorOptions } from '../data/configTypes';
import { INotPlayableGameObject } from './INotPlayableGameObject';
import { INotPlayableDrawer } from './INotPlayableDrawer';

@injectable()
export class NotPlayableDrawer implements INotPlayableDrawer {
  constructor(
    @inject(SharedTypes.BasicRenderer)
    private readonly renderer: IBasicRenderer
  ) {}

  draw(
    stage: PIXI.Container<PIXI.DisplayObject>,
    gameObj: INotPlayableGameObject,
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
  }
}
