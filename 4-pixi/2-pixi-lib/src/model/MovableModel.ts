import { StaticModel } from './StaticModel';
import { Vector2d } from './Vector2d';

export class MovableModel extends StaticModel {
  protected _direction: Vector2d;
  protected _speed: number;

  public get direction() {
    return this._direction;
  }

  constructor(position: Vector2d, direction: Vector2d, speed: number) {
    super(position);
    this._direction = direction;
    this._speed = speed;
  }
}
