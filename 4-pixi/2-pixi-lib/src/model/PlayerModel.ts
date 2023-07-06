import { Vector2d } from '..';
import { IPlayerParams } from '../data/appConfig';
import { IPlayerModel } from './IPlayerModel';
import { IVector2d } from './IVector2d';

export class PlayerModel implements IPlayerModel {
  private _id: string;
  private _isPlayable: boolean;
  private _position: IVector2d;
  private _direction: IVector2d;
  private _speed: number;
  private _radius: number;
  private _params: IPlayerParams;

  public get id() {
    return this._id;
  }

  public get isPlayable() {
    return this._isPlayable;
  }

  public get position() {
    return this._position;
  }

  public get direction(): IVector2d {
    return this._direction;
  }

  public get speed(): number {
    return this._speed;
  }

  public get radius() {
    return this._radius;
  }

  public get params() {
    return this._params;
  }

  public set id(id: string) {
    this._id = id;
  }

  public set isPlayable(isPlayable: boolean) {
    this._isPlayable = isPlayable;
  }

  public set position(position: IVector2d) {
    this._position.x = position.x;
    this._position.y = position.y;
  }

  public set direction(direction: IVector2d) {
    this._direction.x = direction.x;
    this._direction.y = direction.y;
  }

  public set speed(speed: number) {
    this._speed = speed;
  }

  public set radius(radius: number) {
    this._radius = radius;
  }

  public set params(params: IPlayerParams) {
    this._params = params;
  }

  constructor(params: IPlayerParams) {
    this._id = '';
    this._isPlayable = true;
    this._position = params.position;
    this._direction = new Vector2d(0, 0);
    this._speed = params.speed;
    this._radius = params.radius;
    this._params = params;
  }

  public toString(): string {
    return `Player, id: ${this.id}, isPlayable: ${
      this.isPlayable
    }, ${this.position.toString('position')}, ${this.direction}, speed: ${
      this.speed
    }, radius: ${this.radius}, , ${this.params.toString()}`;
  }
}
