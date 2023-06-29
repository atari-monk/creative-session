import * as PIXI from 'pixi.js';
import { IColorOptions } from '../data/configTypes';
import { IPlayablePlayer } from './IPlayablePlayer';

export interface IPlayableDrawer {
  draw(
    stage: PIXI.Container<PIXI.DisplayObject>,
    gameObj: IPlayablePlayer,
    colors: IColorOptions
  ): void;
}
