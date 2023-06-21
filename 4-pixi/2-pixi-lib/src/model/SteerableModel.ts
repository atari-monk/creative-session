import { PositionModel } from './PositionModel';
import { Vector2d } from './Vector2d';
import { ISteerable } from './ISteerable';

export class SteerableModel extends PositionModel implements ISteerable {
  protected _direction: Vector2d;
  protected _speed: number;

  public get direction() {
    return this._direction;
  }

  public set direction(direction: Vector2d) {
    this._direction.x = direction.x;
    this._direction.y = direction.y;
  }

  public get speed() {
    return this._speed;
  }

  public set speed(speed: number) {
    this._speed = speed;
  }

  constructor(position: Vector2d, direction: Vector2d, speed: number) {
    super(position);
    this._direction = direction;
    this._speed = speed;
  }
}
