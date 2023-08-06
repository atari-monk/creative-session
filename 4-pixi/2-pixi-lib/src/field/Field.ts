import * as PIXI from 'pixi.js';
import { injectable, inject } from 'inversify';
import {
  IField,
  IFieldModel,
  IFieldRenderer,
  FieldTypes,
} from 'atari-monk-game-api-lib';
import { GameObject } from '../game-obj/GameObject';
import { StringBuilder } from '../utils/StringBuilder';

@injectable()
export class Field extends GameObject implements IField {
  public get model(): IFieldModel {
    return this._model;
  }

  constructor(
    @inject(FieldTypes.Model) private readonly _model: IFieldModel,
    @inject(FieldTypes.Renderer)
    private readonly renderer: IFieldRenderer
  ) {
    super();
  }

  public draw(stage: PIXI.Container<PIXI.DisplayObject>): void {
    this.renderer.draw(stage, this._model);
  }

  public update(deltaTime: number): void {}

  public toString() {
    const builder = new StringBuilder();
    builder.append(this.model.toString());
    builder.append('updateables:');
    console.log(builder.toString());
  }
}
