import { IBall } from '../ball/IBall';
import { IPlayer } from '../player/IPlayer';

export interface IBallGame {
  ball: IBall;
  player: IPlayer;
  gameLoop(deltaTime: number): void;
  setBallGameObjects(): void;
}
