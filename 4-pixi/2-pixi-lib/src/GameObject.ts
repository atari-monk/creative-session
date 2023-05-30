import * as PIXI from 'pixi.js';
import { IGameObject } from './IGameObject';

export abstract class GameObject implements IGameObject {
  abstract draw(stage: PIXI.Container<PIXI.DisplayObject>): void;
  abstract update(deltaTime: number): void;
}