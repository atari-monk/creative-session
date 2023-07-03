import * as PIXI from 'pixi.js';
import { IPlayerModel } from '../model/IPlayerModel';

export interface IPlayerRenderer {
  draw(stage: PIXI.Container<PIXI.DisplayObject>, model: IPlayerModel): void;
}
