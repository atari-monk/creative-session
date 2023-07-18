import { Container } from 'inversify';
import {
  IAppHelper,
  IGameObjectManager,
  IGameUpdateable,
  IBallGame,
  IRegister,
} from 'atari-monk-game-api-lib';
import { appHelperParams } from '../data/ballGameParams';
import { AppHelper } from './AppHelper';
import { GameObjectManager } from '../game-obj/GameObjectManager';
import { Collider } from '../game-updateable/Collider';
import { BallGame } from '../ball-game/BallGame';

export abstract class AppFactoryBase implements IRegister {
  constructor(protected readonly container: Container) {}

  public register() {
    this.container
      .bind<IAppHelper>(AppHelper)
      .toDynamicValue(() => {
        return new AppHelper(appHelperParams);
      })
      .inSingletonScope();

    this.registerPixiApp();

    this.container
      .bind<IGameObjectManager>(GameObjectManager)
      .to(GameObjectManager)
      .inSingletonScope();

    this.container
      .bind<IGameUpdateable>(Collider)
      .to(Collider)
      .inSingletonScope();

    this.container.bind<IBallGame>(BallGame).to(BallGame).inSingletonScope();
  }

  abstract registerPixiApp(): void;
}
