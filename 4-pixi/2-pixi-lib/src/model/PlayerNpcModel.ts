import { IPlayerNpcParams } from '../data/interfaces/IPlayerNpcParams';
import { IPlayerNpcModel } from './IPlayerNpcModel';
import { IVector2d } from './IVector2d';

export class PlayerNpcModel implements IPlayerNpcModel {
  private _clientId: string;
  private _isPlayable: boolean;
  private _position: IVector2d;
  private _radius: number;
  private _params: IPlayerNpcParams;

  public get clientId() {
    return this._clientId;
  }

  public get isPlayable() {
    return this._isPlayable;
  }

  public get position() {
    return this._position;
  }

  public get radius() {
    return this._radius;
  }

  public get params() {
    return this._params;
  }

  public set clientId(clientId: string) {
    this._clientId = clientId;
  }

  public set position(position: IVector2d) {
    this._position.x = position.x;
    this._position.y = position.y;
  }

  public set radius(radius: number) {
    this._radius = radius;
  }

  public set params(params: IPlayerNpcParams) {
    this._params = params;
  }

  constructor(params: IPlayerNpcParams) {
    this._clientId = '';
    this._isPlayable = false;
    this._position = params.position;
    this._radius = params.radius;
    this._params = params;
  }

  public toString() {
    return `PlayerNpc, clientId: ${this.clientId}, playable: ${
      this.isPlayable
    }, ${this.position.toString('position')}, radius: ${
      this.radius
    }. ${this.params.toString()}`;
  }
}
