import * as PIXI from 'pixi.js';
import { IColorParams } from '../data/interfaces/IColorParams';
import { ICircle } from '../model/interface/ICircle';

export interface ICircleRenderer {
  render(
    stage: PIXI.Container<PIXI.DisplayObject>,
    gameObj: ICircle,
    colors: IColorParams
  ): void;
}
