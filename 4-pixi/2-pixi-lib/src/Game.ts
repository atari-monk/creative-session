import * as PIXI from 'pixi.js';
import { IBall } from './ball/IBall';
import { IPlayer } from './player/IPlayer';
import { IGameUpdateable } from './IGameUpdateable';
import { IGameObjectManager } from './IGameObjectManager';

export class Game {
  protected gameObjectManager: IGameObjectManager;
  private pixiApp: PIXI.Application<PIXI.ICanvas>;
  private _ball!: IBall;
  private _player!: IPlayer;

  public set ball(ball: IBall) {
    this._ball = ball;
  }

  public set player(player: IPlayer) {
    this._player = player;
  }

  constructor(
    pixiApp: PIXI.Application<PIXI.ICanvas>,
    gameObjectManager: IGameObjectManager,
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

  public setBallGameObjectsForVer1() {
    this.gameObjectManager.assertGameObjects();
    this.ball = this.gameObjectManager.findBallObject();
    this.player = this.gameObjectManager.findPlayerObject();
  }

  public setBallGameObjectsForVer2() {
    this.gameObjectManager.assertGameObjects();
    this.ball = this.gameObjectManager.findBall();
    this.player = this.gameObjectManager.findPlayer();
  }
}
