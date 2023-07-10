import * as PIXI from 'pixi.js';
import { IColorOptions } from '../data/interfaces/IColorOptions';
import { ICircle } from '../model/interface/ICircle';

export interface ICircleRenderer {
  render(
    stage: PIXI.Container<PIXI.DisplayObject>,
    gameObj: ICircle,
    colors: IColorOptions
  ): void;
}
