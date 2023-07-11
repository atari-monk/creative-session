import { Container } from 'inversify';
import { getPixiAppParams } from '../data/ballGameParams';
import { Application } from 'pixi.js';
import { getCanvasForPixi } from '../utils/ui';
import { AppFactoryBase } from './AppFactoryBase';

export class AppFactory extends AppFactoryBase {
  constructor(container: Container) {
    super(container);
  }

  registerPixiApp(): void {
    const pixiAppParams = getPixiAppParams(getCanvasForPixi('pixiApp'));
    this.container
      .bind<Application>(Application)
      .toDynamicValue(() => {
        return new Application(pixiAppParams);
      })
      .inSingletonScope();
  }
}
