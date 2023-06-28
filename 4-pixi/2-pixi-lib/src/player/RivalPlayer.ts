import * as PIXI from 'pixi.js';
import { injectable, inject } from 'inversify';
import { RivalPlayerTypes, SharedTypes } from '../data/appConfig';
import { GameObject } from '../gameObject/GameObject';
import { IVector2d } from '../model/IVector2d';
import { IColorOptions } from '../data/configTypes';
import { IBasicRenderer } from '../IBasicRenderer';
import { IPosition } from '../model/IPosition';
import { ICircle } from '../model/ICircle';
import { IPlayer } from './IPlayer';
import { IPlayable } from '../model/IPlayable';
import { IIdModel } from '../model/IIdModel';

@injectable()
export class RivalPlayer extends GameObject implements IPlayer {
  public get position(): IVector2d {
    return this.origin.position;
  }

  public set position(position: IVector2d) {
    this.origin.position.x = position.x;
    this.origin.position.y = position.y;
  }

  public get radius(): number {
    return this.circle.radius;
  }

  public get isPlayable(): boolean {
    return this.playable.isPlayable;
  }

  public set isPlayable(isPlayable: boolean) {
    this.playable.isPlayable = isPlayable;
  }

  public get id(): string {
    return this.playerId.id;
  }

  public set id(clientId: string) {
    this.playerId.id = clientId;
  }

  constructor(
    @inject(RivalPlayerTypes.rivalId) private readonly playerId: IIdModel,
    @inject(RivalPlayerTypes.rivalPlayable)
    private readonly playable: IPlayable,
    @inject(RivalPlayerTypes.rivalPosition) private readonly origin: IPosition,
    @inject(RivalPlayerTypes.rivalCircle) private readonly circle: ICircle,
    @inject(SharedTypes.BasicRenderer)
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
