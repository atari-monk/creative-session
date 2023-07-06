import { IGameObjectManager } from './IGameObjectManager';
import { Ball } from './ball/Ball';
import { GameObject } from './gameObject/GameObject';
import { BallObject } from './model-v1/BallObject';
import { PlayerObject } from './model-v1/PlayerObject';
import { Player } from './player/Player';

export class GameObjectManager implements IGameObjectManager {
  private _gameObjects: GameObject[];

  get gameObjects() {
    return this._gameObjects;
  }

  constructor() {
    this._gameObjects = [];
  }

  public addGameObject(gameObject: GameObject) {
    this._gameObjects.push(gameObject);
  }

  public removeGameObject(gameObject: GameObject) {
    const index = this._gameObjects.indexOf(gameObject);
    if (index !== -1) {
      this._gameObjects.splice(index, 1);
    }
  }

  private findGameObject<T>(predicate: (obj: any) => boolean): T {
    return this.gameObjects.find(predicate) as T;
  }

  public findBall(): Ball {
    return this.findGameObject<Ball>((obj) => obj instanceof Ball);
  }

  public findPlayer(): Player {
    return this.findGameObject<Player>(
      (obj) => obj instanceof Player && obj.model.isPlayable
    );
  }

  public findBallObject(): BallObject {
    return this.findGameObject<BallObject>((obj) => obj instanceof BallObject);
  }

  public findPlayerObject(): PlayerObject {
    return this.findGameObject<PlayerObject>(
      (obj) => obj instanceof PlayerObject && obj.isPlayable
    );
  }

  public assertGameObjects() {
    if (!this.gameObjects || this.gameObjects.length === 0)
      throw new Error('GameObjects Array must be populated at this point!');
  }
}
