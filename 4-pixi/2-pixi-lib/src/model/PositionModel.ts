import { injectable } from 'inversify';
import { IPosition as IPosition } from './IPosition';
import { IVector2d } from './IVector2d';

@injectable()
export class PositionModel implements IPosition {
  protected _position: IVector2d;

  public get position() {
    return this._position;
  }

  public set position(position: IVector2d) {
    this._position.x = position.x;
    this._position.y = position.y;
  }

  constructor(position: IVector2d) {
    this._position = position;
  }
}
