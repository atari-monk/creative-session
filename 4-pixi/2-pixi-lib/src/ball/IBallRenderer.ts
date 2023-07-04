import * as PIXI from 'pixi.js';
import { IBallModel } from '../model/IBallModel';

export interface IBallRenderer {
  draw(stage: PIXI.Container<PIXI.DisplayObject>, model: IBallModel): void;
}
