import 'reflect-metadata';
import { expect } from 'chai';
import 'mocha';
import { configureContainer } from '../di-container/inversify.config';
import { IAppHelper } from './IAppHelper';
import { AppHelper } from './AppHelper';
import { Application } from 'pixi.js';
import { IGameObjectManager } from '../gameObject/IGameObjectManager';
import { GameObjectManager } from '../gameObject/GameObjectManager';
import { IGameUpdateable } from '../game-updateable/IGameUpdateable';
import { Collider } from '../game-updateable/Collider';
import { IBallGame } from '../ball-game/IBallGame';
import { BallGame } from '../ball-game/BallGame';
import { toLowerCaseAndRemoveDot } from '../utils/string';
import { Container } from 'inversify';

describe('App Browser', () => {
  let appHelper: IAppHelper;
  let pixiApp: Application;
  let gameObjectManager: IGameObjectManager;
  let collider: IGameUpdateable;
  let ballGame: IBallGame;

  before(() => {
    const container = new Container();
    if (!container.isBound(AppHelper)) {
      configureContainer(container);
    }
    appHelper = container.resolve<IAppHelper>(AppHelper);
    try {
      pixiApp = container.resolve<Application>(Application);
    } catch (error) {
      console.log(
        `Error pixiApp ${toLowerCaseAndRemoveDot((error as Error).message)}`
      );
    }
    gameObjectManager =
      container.resolve<IGameObjectManager>(GameObjectManager);
    collider = container.resolve<IGameUpdateable>(Collider);
    try {
      ballGame = container.resolve<IBallGame>(BallGame);
    } catch (error) {
      console.log(
        `Error pixiApp ${toLowerCaseAndRemoveDot((error as Error).message)}`
      );
    }
  });

  it('appHelper should be instance of AppHelper', () => {
    expect(appHelper).to.be.instanceof(AppHelper);
  });

  it('appHelper should have a size 800x600', () => {
    const params = [appHelper.width, appHelper.height];
    expect(params).to.deep.equal([800, 600]);
  });

  it('pixiApp should be undefined in node env', () => {
    expect(pixiApp).to.be.undefined;
  });

  it('gameObjectManager should be instance of GameObjectManager', () => {
    expect(gameObjectManager).to.be.instanceof(GameObjectManager);
  });

  it('collider should be instance of collider', () => {
    expect(collider).to.be.instanceof(Collider);
  });

  it('ballGame should be undefined in node env', () => {
    expect(ballGame).to.be.undefined;
  });
});
