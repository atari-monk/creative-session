import { IField } from 'atari-monk-game-api-lib';
import {
  Field,
  FieldModel,
  FieldRenderer,
  BasicRenderer,
  fieldParams,
} from 'atari-monk-pixi-lib';

export class FieldFactory {
  private _field: IField;

  public get field() {
    return this._field;
  }

  constructor() {
    try {
      this._field = new Field(
        new FieldModel(fieldParams),
        new FieldRenderer(new BasicRenderer())
      );
    } catch (error) {
      console.error('Error creating field:', error);
      throw error;
    }
  }
}
