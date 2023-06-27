import * as PIXI from 'pixi.js';
import { injectable, inject } from 'inversify';
import { PlayerTypes, SharedTypes } from '../data/appConfig';
import { GameObject } from '../gameObject/GameObject';
import { IVector2d } from '../model/IVector2d';
import { IColorOptions } from '../data/configTypes';
import { IBasicRenderer } from '../IBasicRenderer';
import { ICircle } from '../model/ICircle';
import { ISteerable } from '../model/ISteerable';
import { IPlayer } from './IPlayer';
import { IPlayable } from '../model/IPlayable';
import { IIdModel } from '../model/IIdModel';

@injectable()
export class Player extends GameObject implements IPlayer {
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
    @inject(PlayerTypes.playerId) private readonly playerId: IIdModel,
    @inject(PlayerTypes.playerPlayable) private readonly playable: IPlayable,
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
