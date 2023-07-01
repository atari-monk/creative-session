import * as PIXI from 'pixi.js';
import { injectable, inject } from 'inversify';
import { BallTypes } from '../data/appConfig';
import { GameObject } from '../gameObject/GameObject';
import { IVector2d } from '../model/IVector2d';
import { IPosition } from '../model/IPosition';
import { ICircle } from '../model/ICircle';
import { IBall } from './IBall';
import { IVelocity } from '../model/IVelocity';
import { IBallRenderer } from './IBallRenderer';
import { IColorOptions } from '../data/configTypes';
import { Vector2d } from '../model/Vector2d';

@injectable()
export class Ball extends GameObject implements IBall {
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
    private readonly circle: ICircle,
    @inject(BallTypes.Colors)
    private readonly colors: IColorOptions,
    @inject(BallTypes.Renderer)
    private readonly renderer: IBallRenderer
  ) {
    super();
  }

  public draw(stage: PIXI.Container<PIXI.DisplayObject>): void {
    this.renderer.draw(stage, this, this.colors);
  }

  public update(deltaTime: number): void {}

  public bounce() {
    const currentVelocity = this.velocity;
    const reversedVelocity = new Vector2d(
      -currentVelocity.x,
      -currentVelocity.y
    );
    this.velocity = reversedVelocity;
    //this.emitVelocity();
    //console.log(this._velocity);
  }
}
