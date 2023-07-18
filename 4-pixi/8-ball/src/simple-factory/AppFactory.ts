import * as PIXI from 'pixi.js';
import {
  Collider,
  BallGame,
  AppHelper,
  GameObjectManager,
  appHelperParams,
  getPixiAppParams,
  getCanvasForPixi,
} from 'atari-monk-pixi-lib';
import { IGameObjectManager } from 'atari-monk-game-api-lib';

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
    this._appHelper = new AppHelper(appHelperParams);
    this._pixiApp = new PIXI.Application(
      getPixiAppParams(getCanvasForPixi('pixiApp'))
    );
    this._gameObjectManager = new GameObjectManager();
  }

  public start() {
    this._appHelper.initializeApp(this._pixiApp);
    const game = new BallGame(
      this._pixiApp,
      this._gameObjectManager,
      new Collider()
    );
    game.setBallGameObjects();
    this._appHelper.startAnimationLoop(game);
  }
}
