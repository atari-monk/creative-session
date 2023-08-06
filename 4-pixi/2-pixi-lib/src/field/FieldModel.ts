import { IVector2d, IFieldParams, IFieldModel } from 'atari-monk-game-api-lib';

export class FieldModel implements IFieldModel {
  private _position: IVector2d;
  private _size: IVector2d;
  private _color: number;

  public get position() {
    return this._position;
  }

  public get size() {
    return this._size;
  }

  public get color() {
    return this._color;
  }

  public set position(position: IVector2d) {
    this._position.x = position.x;
    this._position.y = position.y;
  }

  public set size(size: IVector2d) {
    this._size.x = size.x;
    this._size.y = size.y;
  }

  public set color(color: number) {
    this._color = color;
  }

  constructor(params: IFieldParams) {
    this._position = params.position;
    this._size = params.size;
    this._color = params.color;
  }

  public toString(): string {
    return `Field, position: ${this.position.toString(
      'position'
    )}, size: ${this.size.toString('size')}, color: ${this.color}`;
  }
}
