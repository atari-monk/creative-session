import { Ball } from './ball/Ball';
import { GameObject } from './gameObject/GameObject';
import { BallObject } from './model-v1/BallObject';
import { PlayerObject } from './model-v1/PlayerObject';
import { Player } from './player/Player';

export interface IGameObjectManager {
  gameObjects: GameObject[];
  addGameObject(gameObject: GameObject): void;
  removeGameObject(gameObject: GameObject): void;
  findBall(): Ball;
  findPlayer(): Player;
  findBallObject(): BallObject;
  findPlayerObject(): PlayerObject;
  assertGameObjects(): void;
}
