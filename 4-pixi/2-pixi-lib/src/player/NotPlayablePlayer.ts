import * as PIXI from 'pixi.js';
import { injectable, inject } from 'inversify';
import { NotPlayablePlayerTypes } from '../data/appConfig';
import { GameObject } from '../gameObject/GameObject';
import { IVector2d } from '../model/IVector2d';
import { IColorOptions } from '../data/configTypes';
import { IPosition } from '../model/IPosition';
import { ICircle } from '../model/ICircle';
import { INotPlayablePlayer } from './INotPlayablePlayer';
import { IPlayable } from '../model/IPlayable';
import { IIdModel } from '../model/IIdModel';
import { INotPlayableDrawer } from './INotPlayableDrawer';

@injectable()
export class NotPlayablePlayer
  extends GameObject
  implements INotPlayablePlayer
{
  public get id(): string {
    return this.playerId.id;
  }

  public set id(clientId: string) {
    this.playerId.id = clientId;
  }

  public get isPlayable(): boolean {
    return this.playable.isPlayable;
  }

  public set isPlayable(isPlayable: boolean) {
    this.playable.isPlayable = isPlayable;
  }

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

  constructor(
    @inject(NotPlayablePlayerTypes.Id)
    private readonly playerId: IIdModel,
    @inject(NotPlayablePlayerTypes.Playable)
    private readonly playable: IPlayable,
    @inject(NotPlayablePlayerTypes.Position)
    private readonly origin: IPosition,
    @inject(NotPlayablePlayerTypes.Circle)
    private readonly circle: ICircle,
    @inject(NotPlayablePlayerTypes.Colors)
    private readonly colors: IColorOptions,
    @inject(NotPlayablePlayerTypes.Drawer)
    private readonly drawer: INotPlayableDrawer
  ) {
    super();
  }

  public draw(stage: PIXI.Container<PIXI.DisplayObject>): void {
    this.drawer.draw(stage, this, this.colors);
  }

  public update(deltaTime: number): void {}
}
