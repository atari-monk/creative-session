import * as PIXI from 'pixi.js';
import { GameObject } from './GameObject';

export class GenericGameObject extends GameObject {
  draw(stage: PIXI.Container<PIXI.DisplayObject>): void {}

  update(deltaTime: number): void {}
}
