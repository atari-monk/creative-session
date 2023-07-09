import { Container } from 'inversify';
import { appHelperOptions } from '../data/appConfig';
import { IDIFactory } from '../factory/IDIFactory';
import { IAppHelper } from './IAppHelper';
import { AppHelper } from './AppHelper';

export class AppFactory implements IDIFactory {
  constructor(private readonly container: Container) {}

  public register() {
    this.container.bind<IAppHelper>(AppHelper).toDynamicValue(() => {
      return new AppHelper(appHelperOptions);
    });
  }

  public create(): IAppHelper {
    return this.container.resolve<IAppHelper>(AppHelper);
  }
}
