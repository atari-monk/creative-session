import { Container } from 'inversify';
import { appHelperParams, getPixiAppParams } from '../data/ballGameParams';
import { IDIFactory } from '../factory/IDIFactory';
import { IAppHelper } from './IAppHelper';
import { AppHelper } from './AppHelper';
import { Application } from 'pixi.js';
import { getCanvas } from '../utils/ui';

export class AppFactory implements IDIFactory {
  constructor(private readonly container: Container) {}

  public register() {
    this.container.bind<IAppHelper>(AppHelper).toDynamicValue(() => {
      return new AppHelper(appHelperParams);
    });
    this.container.bind<Application>(Application).toDynamicValue(() => {
      return new Application(getPixiAppParams(getCanvas()));
    });
  }

  public create(): void {
    const appHelper = this.container.resolve<IAppHelper>(AppHelper);
  }
}
