import * as PIXI from 'pixi.js';
import { injectable, inject, multiInject } from 'inversify';
import { PlayerTypes as PlayerTypes } from '../data/appConfig';
import { GameObject } from '../gameObject/GameObject';
import { IVector2d } from '../model/IVector2d';
import { IColorOptions } from '../data/configTypes';
import { IRadius } from '../model/IRadius';
import { ISteerable } from '../model/ISteerable';
import { IPlayable } from '../model/IPlayable';
import { IIdModel } from '../model/IIdModel';
import { IPlayer } from './IPlayer';
import { Vector2d } from '../model/Vector2d';
import { IPlayerRenderer } from './IPlayerRenderer';
import { IPlayerUpdater } from './IPlayerUpdater';
import { IBall } from '../ball/IBall';

@injectable()
export class Player extends GameObject implements IPlayer {
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
    return this.steer.position;
  }

  public set position(position: IVector2d) {
    this.steer.position.x = position.x;
    this.steer.position.y = position.y;
  }

  public get radius(): number {
    return this.circle.radius;
  }

  public get direction(): IVector2d {
    return this.steer.direction;
  }

  public set direction(direction: IVector2d) {
    this.steer.direction.x = direction.x;
    this.steer.direction.y = direction.y;
  }

  public get speed(): number {
    return this.steer.speed;
  }

  constructor(
    @inject(PlayerTypes.Id) private readonly playerId: IIdModel,
    @inject(PlayerTypes.Playable)
    private readonly playable: IPlayable,
    @inject(PlayerTypes.Steerable)
    private readonly steer: ISteerable,
    @inject(PlayerTypes.Circle) private readonly circle: IRadius,
    @inject(PlayerTypes.Colors)
    private readonly colors: IColorOptions,
    @inject(PlayerTypes.Renderer)
    private readonly drawer: IPlayerRenderer,
    @multiInject(PlayerTypes.IPlayerUpdater)
    private readonly updatebles: IPlayerUpdater[]
  ) {
    super();
  }

  public draw(stage: PIXI.Container<PIXI.DisplayObject>): void {
    this.drawer.draw(stage, this, this.colors);
  }

  public update(deltaTime: number): void {
    this.updatebles.forEach((updateble) => {
      updateble.update(deltaTime, this);
    });
  }

  public diagnoze() {
    this.updatebles.forEach((updateble) => {
      console.log(updateble);
    });
  }

  public kickBall(ball: IBall) {
    const velocity = new Vector2d(
      this.direction.x * this.speed,
      this.direction.y * this.speed
    );

    ball.velocity = velocity;
    ball.emittVelocity();
  }

  public toString() {
    return `Player, position: (${this.position.x}, ${this.position.y}), direction: (${this.direction.x}, ${this.direction.y}), speed: ${this.speed}, radius: ${this.radius}`;
  }
}
