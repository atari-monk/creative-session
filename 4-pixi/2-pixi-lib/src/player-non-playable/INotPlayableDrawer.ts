import * as PIXI from 'pixi.js';
import { IColorOptions } from '../data/configTypes';
import { INotPlayableGameObject } from './INotPlayableGameObject';

export interface INotPlayableDrawer {
  draw(
    stage: PIXI.Container<PIXI.DisplayObject>,
    gameObj: INotPlayableGameObject,
    colors: IColorOptions
  ): void;
}
