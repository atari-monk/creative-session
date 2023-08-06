import { Container } from 'inversify';
import 'reflect-metadata';
import { Application } from 'pixi.js';
import { expect } from 'chai';
import 'mocha';
import {
  IAppHelper,
  IGameObjectManager,
  IGameUpdateable,
  IBallGame,
} from 'atari-monk-game-api-lib';
import { configureContainerForTest } from '../di-container/inversify.test.config';
import { AppHelper } from './AppHelper';
import { GameObjectManager } from '../game-obj/GameObjectManager';
import { Collider } from '../game-updateable/Collider';
import { BallGame } from '../ball-game/BallGame';
import { PixiApplicationWrapper } from './PixiApplicationWrapper';

describe('App', () => {
  let appHelper: IAppHelper;
  let pixiApp: Application;
  let gameObjectManager: IGameObjectManager;
  let collider: IGameUpdateable;
  let ballGame: IBallGame;

  before(() => {
    const container = new Container();
    if (!container.isBound(AppHelper)) {
      configureContainerForTest(container);
    }
    appHelper = container.resolve<IAppHelper>(AppHelper);
    pixiApp = container.resolve<PixiApplicationWrapper>(PixiApplicationWrapper);
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
