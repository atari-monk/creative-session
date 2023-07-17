import { IGameObject } from 'atari-monk-game-api-lib';
import { IBall, IPlayer } from 'atari-monk-game-api-lib';

export interface IGameObjectManager {
  gameObjects: IGameObject[];
  addGameObject(gameObject: IGameObject): void;
  removeGameObject(gameObject: IGameObject): void;
  findBall(): IBall;
  findPlayer(): IPlayer;
  assertGameObjects(): void;
}
