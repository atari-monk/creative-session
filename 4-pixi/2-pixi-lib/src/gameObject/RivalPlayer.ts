import * as PIXI from 'pixi.js';
import { GameObject } from './GameObject';
import { PositionModel } from './../model/PositionModel';
import { CircleModel } from './../model/CircleModel';
import { Vector2d } from '../model/Vector2d';
import { IColorOptions } from '../data/configTypes';
import { IBasicRenderer } from '../IBasicRenderer';

export class RivalPlayer extends GameObject {
  private readonly origin: PositionModel;
  private readonly circle: CircleModel;

  constructor(
    position: Vector2d,
    radius: number,
    private readonly renderer: IBasicRenderer,
    private readonly colors: IColorOptions
  ) {
    super();
    this.origin = new PositionModel(position);
    this.circle = new CircleModel(radius);
  }

  public get position(): Vector2d {
    return this.origin.position;
  }

  public draw(stage: PIXI.Container<PIXI.DisplayObject>): void {
    this.renderer.drawCircle(
      stage,
      this.colors.player,
      this.position.x,
      this.position.y,
      this.circle.radius
    );
    this.renderer.drawCircle(
      stage,
      this.colors.position,
      this.position.x,
      this.position.y,
      4
    );
  }

  public update(deltaTime: number): void {}
}
