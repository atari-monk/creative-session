import { Container } from 'inversify';
import { Application } from 'pixi.js';
import { instance, mock } from 'ts-mockito';
import { AppFactoryBase } from './AppFactoryBase';

export class AppFactoryForTest extends AppFactoryBase {
  constructor(container: Container) {
    super(container);
  }

  registerPixiApp(): void {
    const mockedApplication: Application = mock(Application);
    const mockInstance: Application = instance(mockedApplication);
    this.container
      .bind<Application>(Application)
      .toDynamicValue(() => {
        return mockInstance;
      })
      .inSingletonScope();
  }
}
