import { inject, injectable } from 'inversify';
import { IPlayer } from './IPlayer';
import { IPlayerUpdater } from './IPlayerUpdater';
import { PlayerTypes } from '../data/appConfig';
import { PositionEmitter } from '../PositionEmitter';
import { IVector2d } from '../model/IVector2d';
import { Vector2d } from '../model/Vector2d';

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
    if (player.position.isEqual(this.previousPosition)) return;
    this.positionEmitter.emitPosition(player.id, player.position);
    this.previousPosition = new Vector2d(player.position.x, player.position.y);
    console.log('emitt possition');
  }
}
