import * as PIXI from 'pixi.js';
import { ICircle } from '../model/ICircle';
import { IColorParams } from '../params/IColorParams';

export interface ICircleRenderer {
  render(
    stage: PIXI.Container<PIXI.DisplayObject>,
    gameObj: ICircle,
    colors: IColorParams
  ): void;
}
