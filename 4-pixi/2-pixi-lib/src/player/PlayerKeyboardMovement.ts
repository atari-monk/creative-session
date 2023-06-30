import { inject, injectable } from 'inversify';
import { IDirectionFromKeyboard } from '../IDirectionFromKeyboard';
import { Vector2d } from '../model/Vector2d';
import { IPlayer } from './IPlayer';
import { IPlayerUpdater } from './IPlayerUpdater';
import { PlayerTypes } from '../data/appConfig';

@injectable()
export class PlayerKeyboardMovement implements IPlayerUpdater {
  constructor(
    @inject(PlayerTypes.DirectionFromKeyboard)
    private readonly keyboard: IDirectionFromKeyboard
  ) {}

  public update(deltaTime: number, player: IPlayer) {
    player.direction = this.keyboard.direction;
    player.position = new Vector2d(
      player.position.x + player.direction.x * player.speed * deltaTime,
      player.position.y + player.direction.y * player.speed * deltaTime
    );
  }
}
