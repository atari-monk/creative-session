import * as PIXI from 'pixi.js';
import { appHelperOptions } from 'atari-monk-pixi-lib';
import { AppHelper, BallRenderer } from 'atari-monk-pixi-lib';

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

  public start(ballRenderer: BallRenderer) {
    this._appHelper.initializeApp(this._pixiApp, ballRenderer);
    this._appHelper.startAnimationLoop();
  }
}
