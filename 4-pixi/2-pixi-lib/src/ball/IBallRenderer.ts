import * as PIXI from 'pixi.js';
import { IColorOptions } from '../data/configTypes';
import { IBall } from './IBall';

export interface IBallRenderer {
  draw(
    stage: PIXI.Container<PIXI.DisplayObject>,
    gameObj: IBall,
    colors: IColorOptions
  ): void;
}
