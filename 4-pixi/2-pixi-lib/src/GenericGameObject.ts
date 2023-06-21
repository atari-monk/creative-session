import * as PIXI from 'pixi.js';
import { GameObject } from './gameObject/GameObject';

export class GenericGameObject extends GameObject {
  draw(_stage: PIXI.Container<PIXI.DisplayObject>): void {}

  update(_deltaTime: number): void {}
}
