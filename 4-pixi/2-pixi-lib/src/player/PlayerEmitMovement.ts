import { inject, injectable } from 'inversify';
import { IPlayablePlayer } from './IPlayablePlayer';
import { IUpdateablePlayer } from './IUpdateablePlayer';
import { PlayablePlayerTypes } from '../data/appConfig';
import { PositionEmitter } from '../PositionEmitter';
import { IVector2d } from '../model/IVector2d';
import { Vector2d } from '../model/Vector2d';

@injectable()
export class PlayerEmitMovement implements IUpdateablePlayer {
  private previousPosition: IVector2d;

  constructor(
    @inject(PlayablePlayerTypes.PositionEmitter)
    private readonly positionEmitter: PositionEmitter
  ) {
    this.previousPosition = new Vector2d(0, 0);
  }

  public update(deltaTime: number, player: IPlayablePlayer) {
    if (
      player.position.x !== this.previousPosition.x ||
      player.position.y !== this.previousPosition.y
    )
      this.positionEmitter.emitPosition(player.id, player.position);
    this.previousPosition = player.position;
  }
}
