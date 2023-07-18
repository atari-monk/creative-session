import { IBall } from '../ball/IBall';
import { IPlayer } from '../player/IPlayer';
import { IGameObject } from './IGameObject';

export interface IGameObjectManager {
  gameObjects: IGameObject[];
  addGameObject(gameObject: IGameObject): void;
  removeGameObject(gameObject: IGameObject): void;
  findBall(): IBall;
  findPlayer(): IPlayer;
  assertGameObjects(): void;
}
