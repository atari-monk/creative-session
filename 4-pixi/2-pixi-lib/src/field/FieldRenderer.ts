import * as PIXI from 'pixi.js';
import {
  IBasicRenderer,
  SharedTypes,
  IFieldModel,
  IFieldRenderer,
} from 'atari-monk-game-api-lib';
import { inject, injectable } from 'inversify';

@injectable()
export class FieldRenderer implements IFieldRenderer {
  constructor(
    @inject(SharedTypes.BasicRenderer)
    private readonly renderer: IBasicRenderer
  ) {}

  draw(stage: PIXI.Container<PIXI.DisplayObject>, model: IFieldModel): void {
    this.renderRectangle(stage, model);
    this.renderPosition(stage, model);
  }

  private renderRectangle(
    stage: PIXI.Container<PIXI.DisplayObject>,
    model: IFieldModel
  ) {
    this.renderer.drawRectangle(
      stage,
      model.color,
      model.position.x,
      model.position.y,
      model.size.x,
      model.size.y
    );
  }

  private renderPosition(
    stage: PIXI.Container<PIXI.DisplayObject>,
    model: IFieldModel
  ) {
    this.renderer.drawCircle(
      stage,
      model.color,
      model.position.x,
      model.position.y,
      2
    );
  }
}
