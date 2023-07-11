import 'reflect-metadata';
import { expect } from 'chai';
import 'mocha';
import {
  configureContainerForTest,
  container,
} from '../di-container/inversify.config';
import { IAppHelper } from './IAppHelper';
import { AppHelper } from './AppHelper';
import { Application } from 'pixi.js';
import { IGameObjectManager } from '../gameObject/IGameObjectManager';
import { GameObjectManager } from '../gameObject/GameObjectManager';
import { IGameUpdateable } from '../game-updateable/IGameUpdateable';
import { Collider } from '../game-updateable/Collider';
import { IBallGame } from '../ball-game/IBallGame';
import { BallGame } from '../ball-game/BallGame';

describe('App', () => {
  let appHelper: IAppHelper;
  let pixiApp: Application;
  let gameObjectManager: IGameObjectManager;
  let collider: IGameUpdateable;
  let ballGame: IBallGame;

  before(() => {
    if (!container.isBound(AppHelper)) {
      configureContainerForTest();
    }
    appHelper = container.resolve<IAppHelper>(AppHelper);
    pixiApp = container.resolve<Application>(Application);
    gameObjectManager =
      container.resolve<IGameObjectManager>(GameObjectManager);
    collider = container.resolve<IGameUpdateable>(Collider);
    ballGame = container.resolve<IBallGame>(BallGame);
  });

  it('appHelper should be instance of AppHelper', () => {
    expect(appHelper).to.be.instanceof(AppHelper);
  });

  it('appHelper should have a size 800x600', () => {
    const params = [appHelper.width, appHelper.height];
    expect(params).to.deep.equal([800, 600]);
  });

  it('pixiApp should be mocked in node env', () => {
    expect(pixiApp).to.be.exist;
  });

  it('gameObjectManager should be instance of GameObjectManager', () => {
    expect(gameObjectManager).to.be.instanceof(GameObjectManager);
  });

  it('collider should be instance of collider', () => {
    expect(collider).to.be.instanceof(Collider);
  });

  it('ballGame should be instance of BallGame', () => {
    expect(ballGame).to.be.instanceof(BallGame);
  });
});
