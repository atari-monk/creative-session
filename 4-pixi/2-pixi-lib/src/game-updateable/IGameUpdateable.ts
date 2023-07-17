import { IBall, IPlayer } from 'atari-monk-game-api-lib';

export interface IGameUpdateable {
  Update(deltaTime: number, ball: IBall, player: IPlayer): void;
}
