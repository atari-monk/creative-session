import * as PIXI from 'pixi.js';

export interface IGameObject {
  draw(stage: PIXI.Container<PIXI.DisplayObject>): void;
  update(deltaTime: number): void;
}
