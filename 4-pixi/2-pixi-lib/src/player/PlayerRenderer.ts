import * as PIXI from 'pixi.js';
import { IBasicRenderer } from '../IBasicRenderer';
import { inject, injectable } from 'inversify';
import { IPlayerRenderer } from './IPlayerRenderer';
import { IPlayerModel } from '../model/IPlayerModel';
import { SharedTypes } from '../di-container/types';

@injectable()
export class PlayerRenderer implements IPlayerRenderer {
  constructor(
    @inject(SharedTypes.BasicRenderer)
    private readonly renderer: IBasicRenderer
  ) {}

  draw(stage: PIXI.Container<PIXI.DisplayObject>, model: IPlayerModel): void {
    this.renderCircle(stage, model);
    this.renderPosition(stage, model);
    this.renderDirection(stage, model);
  }

  private renderCircle(
    stage: PIXI.Container<PIXI.DisplayObject>,
    model: IPlayerModel
  ) {
    this.renderer.drawCircle(
      stage,
      model.params.colors.body,
      model.position.x,
      model.position.y,
      model.radius
    );
  }

  private renderPosition(
    stage: PIXI.Container<PIXI.DisplayObject>,
    model: IPlayerModel
  ) {
    this.renderer.drawCircle(
      stage,
      model.params.colors.position,
      model.position.x,
      model.position.y,
      2
    );
  }

  private renderDirection(
    stage: PIXI.Container<PIXI.DisplayObject>,
    model: IPlayerModel
  ) {
    this.renderer.drawLine(
      stage,
      model.params.colors.direction,
      2,
      model.position.x,
      model.position.y,
      model.direction.x,
      model.direction.y,
      model.radius / 2
    );
  }
}
