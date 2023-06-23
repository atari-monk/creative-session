import * as PIXI from 'pixi.js';
import { injectable, inject } from 'inversify';
import { RivalPlayerTypes } from '../data/appConfig';
import { GameObject } from '../gameObject/GameObject';
import { IVector2d } from '../model/IVector2d';
import { IColorOptions } from '../data/configTypes';
import { IBasicRenderer } from '../IBasicRenderer';
import { IPosition } from '../model/IPosition';
import { ICircle } from '../model/ICircle';

@injectable()
export class RivalPlayer extends GameObject {
  public get position(): IVector2d {
    return this.origin.position;
  }

  public set position(position: IVector2d) {
    this.origin.position.x = position.x;
    this.origin.position.y = position.y;
  }

  constructor(
    @inject(RivalPlayerTypes.rivalPosition) private readonly origin: IPosition,
    @inject(RivalPlayerTypes.rivalCircle) private readonly circle: ICircle,
    @inject(RivalPlayerTypes.BasicRenderer)
    private readonly renderer: IBasicRenderer,
    @inject(RivalPlayerTypes.rivalColors) private readonly colors: IColorOptions
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
  }

  public update(deltaTime: number): void {}
}
