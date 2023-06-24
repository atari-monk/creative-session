import { PositionModel } from './PositionModel';
import { ISteerable } from './ISteerable';
import { IVector2d } from './IVector2d';

export class SteerableModel extends PositionModel implements ISteerable {
  protected _direction: IVector2d;
  protected _speed: number;

  public get direction() {
    return this._direction;
  }

  public set direction(direction: IVector2d) {
    this._direction.x = direction.x;
    this._direction.y = direction.y;
  }

  public get speed() {
    return this._speed;
  }

  public set speed(speed: number) {
    this._speed = speed;
  }

  constructor(position: IVector2d, direction: IVector2d, speed: number) {
    super(position);
    this._direction = direction;
    this._speed = speed;
  }
}
