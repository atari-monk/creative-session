import * as PIXI from 'pixi.js';
import { IBallModel } from 'atari-monk-game-api-lib';

export interface IBallRenderer {
  draw(stage: PIXI.Container<PIXI.DisplayObject>, model: IBallModel): void;
}
