import * as PIXI from 'pixi.js';
import { PlayerObjectOptions } from './PlayerObjectOptions';
import { BallObject } from './BallObject';
import { BasicRenderer } from './BasicRenderer';
import { GameObject } from './GameObject';
import { PlayerObjectComputation } from './PlayerObjectComputation';

export class PlayerObject extends GameObject {
  private readonly _radius: number;
  private readonly _width: number;
  private readonly _height: number;
  private readonly _color: any;
  private readonly _isPlayable: boolean;
  private clientId: string;

  constructor(
    private readonly renderer: BasicRenderer,
    private readonly computation: PlayerObjectComputation,
    options: PlayerObjectOptions
  ) {
    super();
    this._radius = options.radius;
    this._width = options.width;
    this._height = options.height;
    this._color = options.color;
    this._isPlayable = options.isPlayable;
    this.clientId = '';
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

  public set position(newPosition: { x: number; y: number }) {
    this.computation.position = newPosition;
  }

  public update(deltaTime: number) {
    this.computation.update(deltaTime, this.clientId);
  }

  public draw(stage: PIXI.Container) {
    this.renderer.drawCircle(
      stage,
      this._color.player,
      this.position,
      this._radius
    );
    this.renderer.drawCircle(stage, this._color.position, this.position, 4);
    this.renderer.drawLine(
      stage,
      this._color.direction,
      2,
      this.position,
      this.direction,
      this._radius / 2
    );
  }

  public kickBall(ball: BallObject) {
    this.computation.kickBall(ball);
  }
}
