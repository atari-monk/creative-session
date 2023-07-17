import * as PIXI from 'pixi.js';
import { IColorParams, ICircle } from 'atari-monk-game-api-lib';

export interface ICircleRenderer {
  render(
    stage: PIXI.Container<PIXI.DisplayObject>,
    gameObj: ICircle,
    colors: IColorParams
  ): void;
}
