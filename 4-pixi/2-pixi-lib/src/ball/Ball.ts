import * as PIXI from 'pixi.js';
import { injectable, inject } from 'inversify';
import { BallTypes } from '../data/appConfig';
import { GameObject } from '../gameObject/GameObject';
import { IVector2d } from '../model/IVector2d';
import { IPosition } from '../model/IPosition';
import { ICircle } from '../model/ICircle';
import { IBall } from './IBall';

@injectable()
export class Ball extends GameObject implements IBall {
  public get position(): IVector2d {
    return this.origin.position;
  }

  public set position(position: IVector2d) {
    this.origin.position.x = position.x;
    this.origin.position.y = position.y;
  }

//   public get radius(): number {
//     return this.circle.radius;
//   }

  constructor(
    @inject(BallTypes.Position)
    private readonly origin: IPosition,
    // @inject(BallTypes.Circle)
    // private readonly circle: ICircle
  ) {
    super();
  }

  public draw(stage: PIXI.Container<PIXI.DisplayObject>): void {}

  public update(deltaTime: number): void {}
}
