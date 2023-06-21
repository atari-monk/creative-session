import * as PIXI from 'pixi.js';
import { EventEmitter } from 'eventemitter3';
import { PlayerObject, VectorData, IBallOptions, IColorOptions } from './index';
import { GameObject } from './gameObject/GameObject';

export class BallObject extends GameObject {
  private readonly radius: number;
  private readonly speed: number;
  private readonly width: number;
  private readonly height: number;
  private readonly color: IColorOptions;
  private readonly isBall: boolean;
  private readonly _velocity: { x: number; y: number };
  private _client: any;
  private _position: { x: number; y: number };
  private _direction: { x: number; y: number };
  private readonly _emitter: EventEmitter;

  constructor(emitter: EventEmitter, options: IBallOptions) {
    super();
    const { radius, speed, screenSize, color, isBall } = options;
    this.radius = radius;
    this.speed = speed;
    this.width = screenSize.width;
    this.height = screenSize.height;
    this._position = { x: this.width / 2, y: this.height / 2 };
    this._direction = { x: 0, y: 0 };
    this.color = color;
    this.isBall = isBall;
    this._velocity = { x: 0, y: 0 };
    this._emitter = emitter;
  }

  public set client(client: any) {
    this._client = client;
  }

  public set position(newPosition: { x: number; y: number }) {
    this._position.x = newPosition.x;
    this._position.y = newPosition.y;
  }

  public set velocity(newVelocity: { x: number; y: number }) {
    this._velocity.x = newVelocity.x;
    this._velocity.y = newVelocity.y;
  }

  public get velocity() {
    return this._velocity;
  }

  public set direction(newDirection: { x: number; y: number }) {
    this._direction.x = newDirection.x;
    this._direction.y = newDirection.y;
  }

  private emitPosition() {
    if (this._velocity.x === 0 && this._velocity.y === 0) return;
    const data: VectorData = {
      newVector: this._position,
    };
    this._emitter.emit('ball-pos-upd', data);
  }

  public emitVelocity() {
    const data: VectorData = {
      newVector: this._velocity,
    };
    this._emitter.emit('ball-vel-upd', data);
  }

  public update(deltaTime: number) {
    this._position.x += this._velocity.x * deltaTime;
    this._position.y += this._velocity.y * deltaTime;
    this.emitPosition();
  }

  public draw(stage: PIXI.Container) {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(this.color.player);
    graphics.drawCircle(this._position.x, this._position.y, this.radius);
    graphics.endFill();
    stage.addChild(graphics);
    this.drawVectors(stage);
  }

  private drawVectors(stage: PIXI.Container) {
    const positionGraphics = new PIXI.Graphics();
    positionGraphics.beginFill(this.color.position);
    positionGraphics.drawCircle(0, 0, 4);
    positionGraphics.endFill();
    positionGraphics.x = this._position.x;
    positionGraphics.y = this._position.y;
    stage.addChild(positionGraphics);

    const directionGraphics = new PIXI.Graphics();
    directionGraphics.lineStyle(2, this.color.direction);
    directionGraphics.moveTo(this._position.x, this._position.y);
    const directionX = this._direction.x * (this.radius / 2);
    const directionY = this._direction.y * (this.radius / 2);
    directionGraphics.lineTo(
      this._position.x + directionX,
      this._position.y + directionY
    );
    stage.addChild(directionGraphics);
  }

  private checkCircularCollision(player: PlayerObject) {
    const distanceX = player.position.x - this._position.x;
    const distanceY = player.position.y - this._position.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    if (distance < player.radius! + this.radius!) {
      console.log('collision');
      return true;
    }
    return false;
  }

  private bounce() {
    const currentVelocity = this.velocity;
    const reversedVelocity = {
      x: -currentVelocity.x,
      y: -currentVelocity.y,
    };
    this.velocity = reversedVelocity;
    this.emitVelocity();
    console.log(this._velocity);
  }

  public handleCollisions(player: PlayerObject) {
    if (!this.checkCircularCollision(player)) return;
    if (player.direction.x !== 0 || player.direction.y !== 0) {
      player.kickBall(this);
      console.log('kick');
    } else {
      this.bounce();
      console.log('bounce');
    }
  }
}
