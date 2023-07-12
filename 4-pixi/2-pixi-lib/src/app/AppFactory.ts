import { Container } from 'inversify';
import { getPixiAppParams } from '../data/ballGameParams';
import { getCanvasForPixi } from '../utils/ui';
import { AppFactoryBase } from './AppFactoryBase';
import { PixiApplicationWrapper } from './PixiApplicationWrapper';
import { IDIFactory } from '../factory/IDIFactory';
import { IAppHelper } from './IAppHelper';
import { AppHelper } from './AppHelper';
import { IBallGame } from '../ball-game/IBallGame';
import { BallGame } from '../ball-game/BallGame';

export class AppFactory extends AppFactoryBase implements IDIFactory<void> {
  constructor(container: Container) {
    super(container);
  }

  registerPixiApp(): void {
    const pixiAppParams = getPixiAppParams(getCanvasForPixi('pixiApp'));
    this.container
      .bind<PixiApplicationWrapper>(PixiApplicationWrapper)
      .toDynamicValue(() => {
        return new PixiApplicationWrapper(pixiAppParams);
      })
      .inSingletonScope();
  }

  public create(): void {
    const appHelper = this.container.resolve<IAppHelper>(AppHelper);
    const pixiApp = this.container.resolve<PixiApplicationWrapper>(
      PixiApplicationWrapper
    );
    const game = this.container.resolve<IBallGame>(BallGame);
    appHelper.initializeApp(pixiApp);
    game.setBallGameObjects();
    appHelper.startAnimationLoop(game);
  }
}
