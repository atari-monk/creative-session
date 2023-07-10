import * as PIXI from 'pixi.js';
import { injectable, inject } from 'inversify';
import { GameObject } from '../gameObject/GameObject';
import { IPlayerNpc } from './IPlayerNpc';
import { ICircleRenderer } from './ICircleRenderer';
import { IPlayerNpcModel } from '../model/IPlayerNpcModel';
import { PlayerNpcTypes } from '../di-container/types';

@injectable()
export class PlayerNpc extends GameObject implements IPlayerNpc {
  public get model(): IPlayerNpcModel {
    return this._model;
  }

  constructor(
    @inject(PlayerNpcTypes.Model)
    private readonly _model: IPlayerNpcModel,
    @inject(PlayerNpcTypes.Renderer)
    private readonly renderer: ICircleRenderer
  ) {
    super();
  }

  public draw(stage: PIXI.Container<PIXI.DisplayObject>): void {
    this.renderer.render(stage, this.model, this.model.params.colors);
  }

  public update(deltaTime: number): void {}
}
