import * as PIXI from 'pixi.js';
import { IPlayerModel } from 'atari-monk-game-api-lib';

export interface IPlayerRenderer {
  draw(stage: PIXI.Container<PIXI.DisplayObject>, model: IPlayerModel): void;
}
