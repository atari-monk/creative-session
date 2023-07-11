import { Container } from 'inversify';
import { instance, mock } from 'ts-mockito';
import { AppFactoryBase } from './AppFactoryBase';
import { PixiApplicationWrapper } from './PixiApplicationWrapper';

export class AppFactoryForTest extends AppFactoryBase {
  constructor(container: Container) {
    super(container);
  }

  registerPixiApp(): void {
    const mockedApplication: PixiApplicationWrapper = mock(
      PixiApplicationWrapper
    );
    const mockInstance: PixiApplicationWrapper = instance(mockedApplication);
    this.container
      .bind<PixiApplicationWrapper>(PixiApplicationWrapper)
      .toDynamicValue(() => {
        return mockInstance;
      })
      .inSingletonScope();
  }
}
