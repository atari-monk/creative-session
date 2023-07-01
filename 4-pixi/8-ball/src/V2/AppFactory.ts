import * as PIXI from 'pixi.js';
import { Collider, Game, appHelperOptions } from 'atari-monk-pixi-lib';
import { AppHelper } from 'atari-monk-pixi-lib';

export class AppFactory {
  private _pixiApp: PIXI.Application;
  private _appHelper: AppHelper;

  public get pixiApp() {
    return this._pixiApp;
  }

  public get appHelper() {
    return this._appHelper;
  }

  constructor() {
    this._appHelper = new AppHelper(appHelperOptions);
    this._pixiApp = new PIXI.Application(this._appHelper.getPixiAppOptions());
  }

  public start() {
    this._appHelper.initializeApp(this._pixiApp);
    const game = new Game(this._appHelper, this._pixiApp, new Collider());
    if (!this.appHelper.gameObjects || this.appHelper.gameObjects.length === 0)
      throw new Error('Array must be populated at this point!');
    game.ball = this.appHelper.findBallObject();
    game.player = this.appHelper.findPlayer();
    this._appHelper.startAnimationLoop(game);
  }
}
