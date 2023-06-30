import { injectable } from 'inversify';
import { IVector2d } from './IVector2d';
import { IVelocity } from './IVelocity';

@injectable()
export class Velocity implements IVelocity {
  protected _velocity: IVector2d;

  public get velocity() {
    return this._velocity;
  }

  public set velocity(position: IVector2d) {
    this._velocity.x = position.x;
    this._velocity.y = position.y;
  }

  constructor(velocity: IVector2d) {
    this._velocity = velocity;
  }
}
