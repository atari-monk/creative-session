import { IBall, IPlayer } from 'atari-monk-game-api-lib';
import {
  IGameUpdateable,
  IGameObjectManager,
  IBallGame,
} from 'atari-monk-game-api-lib';
import { inject, injectable } from 'inversify';
import { GameObjectManager } from '../game-obj/GameObjectManager';
import { Collider } from '../game-updateable/Collider';
import { PixiApplicationWrapper } from '../app/PixiApplicationWrapper';

@injectable()
export class BallGame implements IBallGame {
  private _ball!: IBall;
  private _player!: IPlayer;

  public set ball(ball: IBall) {
    this._ball = ball;
  }

  public set player(player: IPlayer) {
    this._player = player;
  }

  constructor(
    @inject(PixiApplicationWrapper)
    private readonly pixiApp: PixiApplicationWrapper,
    @inject(GameObjectManager)
    private readonly gameObjectManager: IGameObjectManager,
    @inject(Collider)
    private readonly gameUpdateable: IGameUpdateable
  ) {
    this.gameObjectManager = gameObjectManager;
    this.pixiApp = pixiApp;
  }

  public gameLoop(deltaTime: number) {
    this.pixiApp.stage.removeChildren();
    this.updateAndDrawGameObjects(deltaTime);
  }

  private updateAndDrawGameObjects(deltaTime: number) {
    for (const gameObject of this.gameObjectManager.gameObjects) {
      gameObject.update(deltaTime);
      gameObject.draw(this.pixiApp.stage);
    }
    this.gameUpdateable.Update(deltaTime, this._ball, this._player);
  }

  public setBallGameObjects() {
    this.gameObjectManager.assertGameObjects();
    this.ball = this.gameObjectManager.findBall();
    this.player = this.gameObjectManager.findPlayer();
  }
}
