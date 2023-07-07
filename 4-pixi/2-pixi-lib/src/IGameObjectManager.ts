import { Ball } from './ball/Ball';
import { GameObject } from './gameObject/GameObject';
import { Player } from './player/Player';

export interface IGameObjectManager {
  gameObjects: GameObject[];
  addGameObject(gameObject: GameObject): void;
  removeGameObject(gameObject: GameObject): void;
  findBall(): Ball;
  findPlayer(): Player;
  assertGameObjects(): void;
}
