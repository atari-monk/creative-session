import { IPlayer } from 'atari-monk-game-api-lib';

export interface IPlayerUpdater {
  update(deltaTime: number, player: IPlayer): void;
}
