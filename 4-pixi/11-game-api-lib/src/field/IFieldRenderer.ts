import * as PIXI from 'pixi.js';
import { IFieldModel } from './IFieldModel';

export interface IFieldRenderer {
  draw(stage: PIXI.Container<PIXI.DisplayObject>, model: IFieldModel): void;
}
