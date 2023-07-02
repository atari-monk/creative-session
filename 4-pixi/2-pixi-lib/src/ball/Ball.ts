import * as PIXI from 'pixi.js';
import { injectable, inject } from 'inversify';
import { BallTypes, SharedTypes } from '../data/appConfig';
import { GameObject } from '../gameObject/GameObject';
import { IVector2d } from '../model/IVector2d';
import { IPosition } from '../model/IPosition';
import { IRadius } from '../model/IRadius';
import { IBall } from './IBall';
import { IVelocity } from '../model/IVelocity';
import { IBallRenderer } from './IBallRenderer';
import { IColorOptions } from '../data/configTypes';
import { Vector2d } from '../model/Vector2d';
import EventEmitter from 'eventemitter3';
import { IVectorData } from '../IVectorData';

@injectable()
export class Ball extends GameObject implements IBall {
  private VelocityEvent = 'ball-vel-upd';
  private PositionEvent = 'ball-pos-upd';

  public get position(): IVector2d {
    return this.origin.position;
  }

  public set position(position: IVector2d) {
    this.origin.position.x = position.x;
    this.origin.position.y = position.y;
  }

  public set velocity(velocity: IVector2d) {
    this.velocityModel.velocity.x = velocity.x;
    this.velocityModel.velocity.y = velocity.y;
  }

  public get velocity() {
    return this.velocityModel.velocity;
  }

  public get radius(): number {
    return this.circle.radius;
  }

  constructor(
    @inject(BallTypes.Position)
    private readonly origin: IPosition,
    @inject(BallTypes.Velocity)
    private readonly velocityModel: IVelocity,
    @inject(BallTypes.Circle)
    private readonly circle: IRadius,
    @inject(BallTypes.Colors)
    private readonly colors: IColorOptions,
    @inject(BallTypes.Renderer)
    private readonly renderer: IBallRenderer,
    @inject(SharedTypes.EventEmitter)
    private readonly emitter: EventEmitter
  ) {
    super();
  }

  public draw(stage: PIXI.Container<PIXI.DisplayObject>): void {
    this.renderer.draw(stage, this, this.colors);
  }

  public update(deltaTime: number): void {
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
    this.emitPosition();
  }

  private emitPosition() {
    if (this.velocity.x === 0 && this.velocity.y === 0) return;
    const data: IVectorData = {
      clientId: '0',
      newVector: this.position,
    };
    this.emitter.emit(this.PositionEvent, data);
  }

  public bounce() {
    const currentVelocity = this.velocity;
    const reversedVelocity = new Vector2d(
      -currentVelocity.x,
      -currentVelocity.y
    );
    this.velocity = reversedVelocity;
    this.emittVelocity();
  }

  public emittVelocity() {
    const data: IVectorData = {
      clientId: '0',
      newVector: this.velocity,
    };
    this.emitter.emit(this.VelocityEvent, data);
  }

  public toString() {
    return `Ball, position: (${this.position.x}, ${this.position.y}), velocity: (${this.velocity.x}, ${this.velocity.y}), radius: ${this.radius}`;
  }
}
