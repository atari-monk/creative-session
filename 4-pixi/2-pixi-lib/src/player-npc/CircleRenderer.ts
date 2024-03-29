import { inject, injectable } from 'inversify';
import * as PIXI from 'pixi.js';
import {
  IBasicRenderer,
  ICircleRenderer,
  IColorParams,
  ICircle,
  SharedTypes,
} from 'atari-monk-game-api-lib';

@injectable()
export class CircleRenderer implements ICircleRenderer {
  constructor(
    @inject(SharedTypes.BasicRenderer)
    private readonly renderer: IBasicRenderer
  ) {}

  render(
    stage: PIXI.Container<PIXI.DisplayObject>,
    model: ICircle,
    colors: IColorParams
  ): void {
    this.renderCircle(stage, colors, model);
    this.renderPositionPoint(stage, colors, model);
  }

  private renderCircle(
    stage: PIXI.Container<PIXI.DisplayObject>,
    colors: IColorParams,
    model: ICircle
  ) {
    this.renderer.drawCircle(
      stage,
      colors.body,
      model.position.x,
      model.position.y,
      model.radius
    );
  }

  private renderPositionPoint(
    stage: PIXI.Container<PIXI.DisplayObject>,
    colors: IColorParams,
    model: ICircle
  ) {
    this.renderer.drawCircle(
      stage,
      colors.position,
      model.position.x,
      model.position.y,
      2
    );
  }
}
