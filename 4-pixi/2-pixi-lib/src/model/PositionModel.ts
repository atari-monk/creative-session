import { IPosition as IPosition } from './IPosition';
import { Vector2d } from './Vector2d';

export class PositionModel implements IPosition {
  protected _position: Vector2d;

  public get position() {
    return this._position;
  }

  public set position(position: Vector2d) {
    this._position.x = position.x;
    this._position.y = position.y;
  }

  constructor(position: Vector2d) {
    this._position = position;
  }
}
