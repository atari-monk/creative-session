import { Container } from 'inversify';
import { getPixiAppParams } from '../data/ballGameParams';
import { getCanvasForPixi } from '../utils/ui';
import { AppFactoryBase } from './AppFactoryBase';
import { PixiApplicationWrapper } from './PixiApplicationWrapper';

export class AppFactory extends AppFactoryBase {
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
}
