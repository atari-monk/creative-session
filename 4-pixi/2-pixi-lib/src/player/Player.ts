import * as PIXI from 'pixi.js';
import { injectable, inject } from 'inversify';
import { PlayerTypes, SharedTypes } from '../data/appConfig';
import { GameObject } from '../gameObject/GameObject';
import { IVector2d } from '../model/IVector2d';
import { IColorOptions } from '../data/configTypes';
import { IBasicRenderer } from '../IBasicRenderer';
import { ICircle } from '../model/ICircle';
import { ISteerable } from '../model/ISteerable';

@injectable()
export class Player extends GameObject {
  public get position(): IVector2d {
    return this.steer.position;
  }

  public set position(position: IVector2d) {
    this.steer.position.x = position.x;
    this.steer.position.y = position.y;
  }

  public get direction(): IVector2d {
    return this.steer.direction;
  }

  public get radius(): number {
    return this.circle.radius;
  }

  constructor(
    @inject(PlayerTypes.playerSteering) private readonly steer: ISteerable,
    @inject(PlayerTypes.playerCircle) private readonly circle: ICircle,
    @inject(SharedTypes.BasicRenderer)
    private readonly renderer: IBasicRenderer,
    @inject(PlayerTypes.playerColors) private readonly colors: IColorOptions
  ) {
    super();
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
      2
    );
    this.renderer.drawLine(
      stage,
      this.colors.direction,
      2,
      this.position.x,
      this.position.y,
      this.direction.x,
      this.direction.y,
      this.circle.radius / 2
    );
  }

  public update(deltaTime: number): void {}
}
