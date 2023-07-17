import { IBall, IPlayer } from 'atari-monk-game-api-lib';

export interface IBallGame {
  ball: IBall;
  player: IPlayer;
  gameLoop(deltaTime: number): void;
  setBallGameObjects(): void;
}
