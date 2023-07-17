import * as PIXI from 'pixi.js';
import { injectable, inject, multiInject } from 'inversify';
import { GameObject } from '../game-obj/GameObject';
import { IPlayer, IBall, IPlayerModel } from 'atari-monk-game-api-lib';
import { Vector2d } from '../model/Vector2d';
import { IPlayerRenderer } from './IPlayerRenderer';
import { IPlayerUpdater } from './IPlayerUpdater';
import { StringBuilder } from '../utils/StringBuilder';
import { PlayerTypes } from '../di-container/types';

@injectable()
export class Player extends GameObject implements IPlayer {
  public get model(): IPlayerModel {
    return this._model;
  }

  constructor(
    @inject(PlayerTypes.Model) private readonly _model: IPlayerModel,
    @inject(PlayerTypes.Renderer)
    private readonly renderer: IPlayerRenderer,
    @multiInject(PlayerTypes.IPlayerUpdater)
    private readonly updatebles: IPlayerUpdater[]
  ) {
    super();
  }

  public draw(stage: PIXI.Container<PIXI.DisplayObject>): void {
    this.renderer.draw(stage, this._model);
  }

  public update(deltaTime: number): void {
    this.updatebles.forEach((updateble) => {
      updateble.update(deltaTime, this);
    });
  }

  public kickBall(ball: IBall) {
    ball.model.velocity = new Vector2d(
      this.model.direction.x * this.model.speed,
      this.model.direction.y * this.model.speed
    );
    ball.emittVelocity();
  }

  public toString() {
    const builder = new StringBuilder();
    builder.append(this.model.toString());
    builder.append('updateables:');
    this.updatebles.forEach((updateble) => {
      builder.append(updateble.toString());
    });
    console.log(builder.toString());
  }
}
