import * as PIXI from 'pixi.js';
import { GameObject } from './GameObject';
import { PlayerObjectOptions } from './PlayerObjectOptions';
import { BallObject } from './BallObject';
import { KeyboardInputHandler } from './KeyboardInputHandler';
import { BasicRenderer } from './BasicRenderer';
import { PositionEmitter } from './PositionEmitter';

export class PlayerObject extends GameObject {
  private readonly _radius: number;
  private readonly _speed: number;
  private readonly _width: number;
  private readonly _height: number;
  private readonly _color: any;
  public readonly isPlayable: boolean;
  private _direction: { x: number; y: number };
  private _position: { x: number; y: number };
  public clientId: string | undefined;

  constructor(
    private readonly renderer: BasicRenderer,
    private readonly keyboard: KeyboardInputHandler,
    private readonly positionEmitter: PositionEmitter,
    options: PlayerObjectOptions
  ) {
    super();
    this._radius = options.radius;
    this._speed = options.speed;
    this._width = options.width;
    this._height = options.height;
    this._direction = { x: 0, y: 0 };
    this._position = { x: this._width / 2, y: this._height / 2 };
    this._color = options.color;
    this.isPlayable = options.isPlayable;
  }

  public get position() {
    return this._position;
  }

  public get direction() {
    return this._direction;
  }

  public get radius() {
    return this._radius;
  }

  public set position(newPosition: { x: number; y: number }) {
    this._position.x = newPosition.x;
    this._position.y = newPosition.y;
  }

  private handleKeyboardInput() {
    if (!this.isPlayable) return;

    const direction = this.keyboard.direction;
    this._direction = direction;
    this.emitMovementEventIfNeeded();
  }

  private emitMovementEventIfNeeded() {
    const newPosition = {
      x: this._position.x + this._direction.x * this._speed,
      y: this._position.y + this._direction.y * this._speed,
    };
    if (
      this.clientId &&
      (newPosition.x !== this._position.x || newPosition.y !== this._position.y)
    ) {
      this._position = newPosition;
      this.positionEmitter.emitPosition(this.clientId, newPosition);
    }
  }

  public update(deltaTime: number) {
    this.handleKeyboardInput();

    const velocity = {
      x: this._direction.x * this._speed * deltaTime,
      y: this._direction.y * this._speed * deltaTime,
    };

    this._position.x += velocity.x;
    this._position.y += velocity.y;
  }

  public draw(stage: PIXI.Container) {
    this.renderer.drawCircle(
      stage,
      this._color.player,
      this._position,
      this._radius
    );
    this.renderer.drawCircle(stage, this._color.position, this._position, 4);
    this.renderer.drawLine(
      stage,
      this._color.direction,
      2,
      this._position,
      this._direction,
      this._radius / 2
    );
  }

  public kickBall(ball: BallObject) {
    const velocity = {
      x: this._direction.x * this._speed * 2,
      y: this._direction.y * this._speed * 2,
    };

    ball.velocity = velocity;
    ball.emitVelocity();
  }
}
