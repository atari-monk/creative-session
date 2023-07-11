import * as PIXI from 'pixi.js';
import {
  BallGame,
  IGameObjectManager,
  AppHelper,
  GameObjectManager,
  AppFactory as DIAppFactory,
  IBallGame,
} from 'atari-monk-pixi-lib';
import { Container } from 'inversify';
import { IAppHelper } from 'atari-monk-pixi-lib/app/IAppHelper';

export class AppFactory {
  private _pixiApp: PIXI.Application;
  private _appHelper: IAppHelper;
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

  constructor(container: Container) {
    const appFactory = new DIAppFactory(container);
    appFactory.register();
    this._appHelper = container.resolve<IAppHelper>(AppHelper);
    this._pixiApp = container.resolve<PIXI.Application>(PIXI.Application);
    this._gameObjectManager =
      container.resolve<IGameObjectManager>(GameObjectManager);
  }

  public start(container: Container) {
    this._appHelper.initializeApp(this._pixiApp);
    const game = container.resolve<IBallGame>(BallGame);
    game.setBallGameObjects();
    this._appHelper.startAnimationLoop(game);
  }
}
