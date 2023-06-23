import { ICircle } from './ICircle';

export class CircleModel implements ICircle {
  protected _radius: number;

  public get radius() {
    return this._radius;
  }

  public set radius(radius: number) {
    this._radius = radius;
  }

  constructor(radius: number) {
    this._radius = radius;
  }
}
