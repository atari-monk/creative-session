import { Container } from 'inversify';
import { appHelperParams } from '../data/ballGameParams';
import { IAppHelper } from './IAppHelper';
import { AppHelper } from './AppHelper';
import { IGameObjectManager } from '../game-obj/IGameObjectManager';
import { GameObjectManager } from '../game-obj/GameObjectManager';
import { IGameUpdateable } from '../game-updateable/IGameUpdateable';
import { Collider } from '../game-updateable/Collider';
import { BallGame } from '../ball-game/BallGame';
import { IBallGame } from '../ball-game/IBallGame';
import { IRegister } from '../factory/IRegister';

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
