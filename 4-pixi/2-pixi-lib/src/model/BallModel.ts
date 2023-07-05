import { Vector2d } from '../model/Vector2d';
import { IBallParams } from '../data/IBallParams';
import { IBallModel } from './../model/IBallModel';
import { IVector2d } from './../model/IVector2d';

export class BallModel implements IBallModel {
  private _id: string;
  private _position: IVector2d;
  private _velocity: IVector2d;
  private _radius: number;
  private _params: IBallParams;

  public get id() {
    return this._id;
  }

  public get position() {
    return this._position;
  }

  public get velocity() {
    return this._velocity;
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

  public set position(position: IVector2d) {
    this._position.x = position.x;
    this._position.y = position.y;
  }

  public set velocity(velocity: IVector2d) {
    this._velocity.x = velocity.x;
    this._velocity.y = velocity.y;
  }

  public set radius(radius: number) {
    this._radius = radius;
  }

  public set params(params: IBallParams) {
    this._params = params;
  }

  constructor(params: IBallParams) {
    this._id = '';
    this._position = params.position;
    this._velocity = new Vector2d(0, 0);
    this._radius = params.radius;
    this._params = params;
  }

  public toString(): string {
    return `Ball: id: ${this.id}, ${this.position.toString(
      'position'
    )}, ${this.velocity.toString('velocity')}, radius: ${
      this.radius
    }, ${this.params.toString()}`;
  }
}
