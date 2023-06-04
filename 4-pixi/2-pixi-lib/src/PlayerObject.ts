import * as PIXI from 'pixi.js';
import { GameObject } from './GameObject.js';
import { KeyboardInputV1 } from './KeyboardInputV1.js';
import { PlayerObjectOptions } from './PlayerObjectOptions.js';
import { EventEmitter } from 'eventemitter3';
import { VectorData } from './VectorData.js';
import { BallObject } from './BallObject.js';

export class PlayerObject extends GameObject {
  private readonly _keyboard: KeyboardInputV1;
  private readonly _id: string;
  private readonly _radius: number;
  private readonly _speed: number;
  private readonly _width: number;
  private readonly _height: number;
  private readonly _keys: any; // Replace 'any' with the actual type of 'keys'
  private readonly _color: any; // Replace 'any' with the actual type of 'color'
  public readonly isPlayable: boolean;
  private readonly _playerNr: number;
  private _direction: { x: number; y: number };
  private _position: { x: number; y: number };
  //private _client!: any;
  public clientId: any;
  //todo: this will remove need for client ref soon
  private _positionEmitter: EventEmitter | null;

  constructor(
    keyboard: KeyboardInputV1,
    positionEmitter: EventEmitter | null,
    options: PlayerObjectOptions
  ) {
    super();
    this._keyboard = keyboard;
    this._id = options.id;
    this._radius = options.radius;
    this._speed = options.speed;
    this._width = options.width;
    this._height = options.height;
    this._direction = { x: 0, y: 0 };
    this._position = { x: this._width / 2, y: this._height / 2 };
    this._keys = options.keys;
    this._color = options.color;
    this.isPlayable = options.isPlayable;
    this._playerNr = options.playerNr;
    this._positionEmitter = positionEmitter;
  }

  private emitPositionUpdate(newPosition: { x: number; y: number }) {
    const data: VectorData = {
      clientId: this.clientId,
      newVector: newPosition,
    };
    this._positionEmitter?.emit('positionUpdate', data);
    //console.log('emitPositionUpdate', data);
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

    const direction = { x: 0, y: 0 };
    const { _keys } = this;

    if (
      this._keyboard.isKeyDown(_keys.left) ||
      this._keyboard.isKeyDown(_keys.a)
    ) {
      direction.x -= 1;
    }

    if (
      this._keyboard.isKeyDown(_keys.right) ||
      this._keyboard.isKeyDown(_keys.d)
    ) {
      direction.x += 1;
    }

    if (
      this._keyboard.isKeyDown(_keys.up) ||
      this._keyboard.isKeyDown(_keys.w)
    ) {
      direction.y -= 1;
    }

    if (
      this._keyboard.isKeyDown(_keys.down) ||
      this._keyboard.isKeyDown(_keys.s)
    ) {
      direction.y += 1;
    }

    const length = Math.sqrt(direction.x ** 2 + direction.y ** 2);
    if (length !== 0) {
      direction.x /= length;
      direction.y /= length;
    }

    this._direction = direction;
    this.emitMovementEventIfNeeded();
  }

  private emitMovementEventIfNeeded() {
    const newPosition = {
      x: this._position.x + this._direction.x * this._speed,
      y: this._position.y + this._direction.y * this._speed,
    };
    if (
      //this.isPlayable &&
      //this.client &&
      this.clientId &&
      (newPosition.x !== this._position.x || newPosition.y !== this._position.y)
    ) {
      this._position = newPosition;
      //   this.client.socket!.emit('movement', {
      //     clientId: this._clientId,
      //     newPosition: this._position,
      //   });
      //console.log('emitt shoul be  happening');
      this.emitPositionUpdate(newPosition);
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
    this.drawPlayerCircle(stage);
    this.drawPositionCircle(stage);
    this.drawDirectionLine(stage);
  }

  private drawPlayerCircle(stage: PIXI.Container) {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(this._color.player);
    graphics.drawCircle(this._position.x, this._position.y, this._radius);
    graphics.endFill();
    stage.addChild(graphics);
  }

  private drawPositionCircle(stage: PIXI.Container) {
    const positionGraphics = new PIXI.Graphics();
    positionGraphics.beginFill(this._color.position);
    positionGraphics.drawCircle(0, 0, 4);
    positionGraphics.endFill();
    positionGraphics.x = this._position.x;
    positionGraphics.y = this._position.y;
    stage.addChild(positionGraphics);
  }

  private drawDirectionLine(stage: PIXI.Container) {
    const directionGraphics = new PIXI.Graphics();
    directionGraphics.lineStyle(2, this._color.direction);
    directionGraphics.moveTo(this._position.x, this._position.y);
    const directionX = this._direction.x * (this._radius / 2);
    const directionY = this._direction.y * (this._radius / 2);
    directionGraphics.lineTo(
      this._position.x + directionX,
      this._position.y + directionY
    );
    stage.addChild(directionGraphics);
  }

  public kickBall(ball: BallObject) {
    // Replace 'any' with the actual type of 'ball'
    const velocity = {
      x: this._direction.x * this._speed * 2,
      y: this._direction.y * this._speed * 2,
    };

    ball.velocity = velocity;
    ball.emitVelocity();
  }
}
