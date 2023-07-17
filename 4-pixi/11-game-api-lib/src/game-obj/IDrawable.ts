import * as PIXI from 'pixi.js';

export interface IDrawable {
  draw(stage: PIXI.Container<PIXI.DisplayObject>): void;
}
