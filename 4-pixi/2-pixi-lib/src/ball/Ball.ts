import * as PIXI from 'pixi.js';
import { injectable, inject } from 'inversify';
import { BallTypes, SharedTypes } from '../data/types';
import { GameObject } from '../gameObject/GameObject';
import { IBall } from './IBall';
import { IBallRenderer } from './IBallRenderer';
import EventEmitter from 'eventemitter3';
import { IVectorData } from '../IVectorData';
import { IBallModel } from '../model/IBallModel';
import { Vector2d } from '../model/Vector2d';

@injectable()
export class Ball extends GameObject implements IBall {
  private VelocityEvent = 'ball-vel-upd';
  private PositionEvent = 'ball-pos-upd';

  public get model(): IBallModel {
    return this._model;
  }

  constructor(
    @inject(BallTypes.Model)
    private readonly _model: IBallModel,
    @inject(BallTypes.Renderer)
    private readonly renderer: IBallRenderer,
    @inject(SharedTypes.EventEmitter)
    private readonly emitter: EventEmitter
  ) {
    super();
  }

  public draw(stage: PIXI.Container<PIXI.DisplayObject>): void {
    this.renderer.draw(stage, this.model);
  }

  public update(deltaTime: number): void {
    this._model.position.x += this._model.velocity.x * deltaTime;
    this._model.position.y += this._model.velocity.y * deltaTime;
    this.emitPosition();
  }

  private emitPosition() {
    if (this._model.velocity.x === 0 && this._model.velocity.y === 0) return;
    const data: IVectorData = {
      clientId: '0',
      newVector: this._model.position,
    };
    this.emitter.emit(this.PositionEvent, data);
  }

  public bounce() {
    const currentVelocity = this._model.velocity;
    const reversedVelocity = new Vector2d(
      -currentVelocity.x,
      -currentVelocity.y
    );
    this._model.velocity = reversedVelocity;
    this.emittVelocity();
  }

  public emittVelocity() {
    const data: IVectorData = {
      clientId: '0',
      newVector: this._model.velocity,
    };
    this.emitter.emit(this.VelocityEvent, data);
  }

  toString(): string {
    return this.model.toString();
  }
}
