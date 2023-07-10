import { inject, injectable } from 'inversify';
import { IPlayer } from './IPlayer';
import { IPlayerUpdater } from './IPlayerUpdater';
import { PositionEmitter } from '../PositionEmitter';
import { IVector2d } from '../model/IVector2d';
import { Vector2d } from '../model/Vector2d';
import { PlayerTypes } from '../di-container/types';

@injectable()
export class PlayerMoveEmitter implements IPlayerUpdater {
  private previousPosition: IVector2d;

  constructor(
    @inject(PlayerTypes.PositionEmitter)
    private readonly positionEmitter: PositionEmitter
  ) {
    this.previousPosition = new Vector2d(0, 0);
  }

  public update(deltaTime: number, player: IPlayer) {
    const p = player.model;
    if (p.position.isEqual(this.previousPosition)) return;
    this.positionEmitter.emitPosition(p.clientId, p.position);
    this.previousPosition = new Vector2d(p.position.x, p.position.y);
    console.log('emitt possition');
  }
}
