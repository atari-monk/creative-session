import { inject, injectable } from 'inversify';
import { IDirectionFromKeyboard } from '../IDirectionFromKeyboard';
import { Vector2d } from '../model/Vector2d';
import { IPlayablePlayer } from './IPlayablePlayer';
import { IUpdateablePlayer } from './IUpdateablePlayer';
import { PlayablePlayerTypes } from '../data/appConfig';

@injectable()
export class PlayerKeyboardMovement implements IUpdateablePlayer {
  constructor(
    @inject(PlayablePlayerTypes.DirectionFromKeyboard)
    private readonly keyboard: IDirectionFromKeyboard
  ) {}

  public update(deltaTime: number, player: IPlayablePlayer) {
    player.direction = this.keyboard.direction;
    player.position = new Vector2d(
      player.position.x + player.direction.x * player.speed * deltaTime,
      player.position.y + player.direction.y * player.speed * deltaTime
    );
  }
}
