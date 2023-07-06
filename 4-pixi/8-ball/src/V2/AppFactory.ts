import * as PIXI from 'pixi.js';
import {
  Collider,
  Game,
  IGameObjectManager,
  appHelperOptions,
} from 'atari-monk-pixi-lib';
import { AppHelper, GameObjectManager } from 'atari-monk-pixi-lib';

export class AppFactory {
  private _pixiApp: PIXI.Application;
  private _appHelper: AppHelper;
  private _gameObjectManager: IGameObjectManager;

  public get pixiApp() {
    return this._pixiApp;
  }

  public get appHelper() {
    return this._appHelper;
  }

  public get gameObjsManager() {
    return this._gameObjectManager;
  }

  constructor() {
    this._appHelper = new AppHelper(appHelperOptions);
    this._pixiApp = new PIXI.Application(this._appHelper.getPixiAppOptions());
    this._gameObjectManager = new GameObjectManager();
  }

  public start() {
    this._appHelper.initializeApp(this._pixiApp);
    const game = new Game(
      this._pixiApp,
      this._gameObjectManager,
      new Collider()
    );
    game.setBallGameObjectsForVer2();
    this._appHelper.startAnimationLoop(game);
  }
}
