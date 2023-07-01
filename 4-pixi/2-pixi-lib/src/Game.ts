import * as PIXI from 'pixi.js';
import { AppHelper } from './AppHelper';
import { IBall } from './ball/IBall';
import { IPlayer } from './player/IPlayer';
import { IGameUpdateable } from './IGameUpdateable';

//rename it to game
export class Game {
  protected appHelper: AppHelper;
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
    appHelper: AppHelper,
    pixiApp: PIXI.Application<PIXI.ICanvas>,
    private readonly gameUpdateable: IGameUpdateable
  ) {
    this.appHelper = appHelper;
    this.pixiApp = pixiApp;
  }

  public gameLoop(deltaTime: number) {
    this.pixiApp.stage.removeChildren();
    this.updateAndDrawGameObjects(deltaTime);
  }

  private updateAndDrawGameObjects(deltaTime: number) {
    for (const gameObject of this.appHelper.gameObjects) {
      gameObject.update(deltaTime);
      gameObject.draw(this.pixiApp.stage);
    }
    this.gameUpdateable.Update(deltaTime, this._ball, this._player);
  }
}
