import * as PIXI from 'pixi.js';
import {
  IPlayerOptions,
  BasicRenderer,
  PlayerComputation,
  BallObject,
  IVector2d,
} from './index';
import { GameObject } from './gameObject/GameObject';
import { IPlayer } from './player/IPlayer';

export class PlayerObject extends GameObject implements IPlayer {
  private readonly _radius: number;
  private readonly _width: number;
  private readonly _height: number;
  private readonly _color: any;
  private readonly _isPlayable: boolean;
  private _clientId: string;

  public get speed() {
    return this.computation.speed;
  }

  constructor(
    private readonly renderer: BasicRenderer,
    private readonly computation: PlayerComputation,
    options: IPlayerOptions
  ) {
    super();
    const { radius, screenSize, color, isPlayable } = options;
    this._radius = radius;
    this._width = screenSize.width;
    this._height = screenSize.height;
    this._color = color;
    this._isPlayable = isPlayable;
    this._clientId = '';
  }

  public get id() {
    return this._clientId;
  }

  public set id(clientId: string) {
    this._clientId = clientId;
  }

  public get position() {
    return this.computation.position;
  }

  public get direction() {
    return this.computation.direction;
  }

  public get radius() {
    return this._radius;
  }

  public get isPlayable() {
    return this._isPlayable;
  }

  public set position(newPosition: IVector2d) {
    this.computation.position.x = newPosition.x;
    this.computation.position.y = newPosition.y;
  }

  public update(deltaTime: number) {
    this.computation.update(deltaTime, this._clientId);
  }

  public draw(stage: PIXI.Container) {
    this.renderer.drawCircle(
      stage,
      this._color.body,
      this.position.x,
      this.position.y,
      this._radius
    );
    this.renderer.drawCircle(
      stage,
      this._color.position,
      this.position.x,
      this.position.y,
      4
    );
    this.renderer.drawLine(
      stage,
      this._color.direction,
      2,
      this.position.x,
      this.position.y,
      this.direction.x,
      this.direction.y,
      this._radius / 2
    );
  }

  public kickBall(ball: BallObject) {
    this.computation.kickBall(ball);
  }
}
