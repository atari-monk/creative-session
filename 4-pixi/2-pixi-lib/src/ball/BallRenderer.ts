import { inject, injectable } from 'inversify';
import * as PIXI from 'pixi.js';
import {
  IBasicRenderer,
  IBallRenderer,
  IBallModel,
  SharedTypes,
} from 'atari-monk-game-api-lib';

@injectable()
export class BallRenderer implements IBallRenderer {
  constructor(
    @inject(SharedTypes.BasicRenderer)
    private readonly renderer: IBasicRenderer
  ) {}

  draw(stage: PIXI.Container<PIXI.DisplayObject>, model: IBallModel): void {
    this.renderCircle(stage, model);
    this.renderPosition(stage, model);
  }

  private renderCircle(
    stage: PIXI.Container<PIXI.DisplayObject>,
    model: IBallModel
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
    model: IBallModel
  ) {
    this.renderer.drawCircle(
      stage,
      model.params.colors.position,
      model.position.x,
      model.position.y,
      2
    );
  }
}
