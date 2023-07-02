import { IPlayerNpcParams } from '../data/appConfig';
import { IPlayerNpcModel } from './IPlayerNpcModel';
import { IVector2d } from './IVector2d';

export class PlayerNpcModel implements IPlayerNpcModel {
  private _position: IVector2d;
  private _radius: number;
  private _id: string;
  private _isPlayable: boolean;
  private _params: IPlayerNpcParams;

  public set position(position: IVector2d) {
    this._position.x = position.x;
    this._position.y = position.y;
  }

  public get position() {
    return this._position;
  }

  public set radius(radius: number) {
    this._radius = radius;
  }

  public get radius() {
    return this._radius;
  }

  public get isPlayable() {
    return this._isPlayable;
  }

  public get id() {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public set value(isPlayable: boolean) {
    this._isPlayable = isPlayable;
  }

  public get params() {
    return this._params;
  }

  public set params(params: IPlayerNpcParams) {
    this._params = params;
  }

  constructor(params: IPlayerNpcParams) {
    this._position = params.position;
    this._radius = params.radius;
    this._isPlayable = false;
    this._id = '';
    this._params = params;
  }

  public toString() {
    return `PlayerNpc, id: ${this.id}, playable: ${
      this.isPlayable
    }, ${this.position.toString('position')}, radius: ${
      this.radius
    }. ${this.params.toString()}`;
  }
}
