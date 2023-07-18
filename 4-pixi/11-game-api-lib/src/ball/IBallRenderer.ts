import * as PIXI from 'pixi.js';
import { IBallModel } from './IBallModel';

export interface IBallRenderer {
  draw(stage: PIXI.Container<PIXI.DisplayObject>, model: IBallModel): void;
}
