import { Container } from 'inversify';
import { appHelperParams } from '../data/ballGameParams';
import { IDIFactory } from '../factory/IDIFactory';
import { IAppHelper } from './IAppHelper';
import { AppHelper } from './AppHelper';

export class AppFactory implements IDIFactory {
  constructor(private readonly container: Container) {}

  public register() {
    this.container.bind<IAppHelper>(AppHelper).toDynamicValue(() => {
      return new AppHelper(appHelperParams);
    });
  }

  public create(): IAppHelper {
    return this.container.resolve<IAppHelper>(AppHelper);
  }
}
