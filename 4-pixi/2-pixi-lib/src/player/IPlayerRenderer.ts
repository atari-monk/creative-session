import * as PIXI from 'pixi.js';
import { IColorOptions } from '../data/configTypes';
import { IPlayer as IPlayer } from './IPlayer';

export interface IPlayerRenderer {
  draw(
    stage: PIXI.Container<PIXI.DisplayObject>,
    gameObj: IPlayer,
    colors: IColorOptions
  ): void;
}
