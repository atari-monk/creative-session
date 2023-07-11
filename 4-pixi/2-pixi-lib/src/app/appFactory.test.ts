import 'reflect-metadata';
import { expect } from 'chai';
import 'mocha';
import {
  configureContainer,
  container,
} from '../di-container/inversify.config';
import { IAppHelper } from './IAppHelper';
import { AppHelper } from './AppHelper';
import { Application } from 'pixi.js';
import { toLowerCaseAndRemoveDot } from '../utils/string';

describe('App', () => {
  let appHelper: IAppHelper;
  let pixiApp: Application;

  before(() => {
    if (!container.isBound(AppHelper)) {
      configureContainer();
    }
    appHelper = container.resolve<IAppHelper>(AppHelper);
    try {
      pixiApp = container.resolve<Application>(Application);
    } catch (error) {
      console.log(
        `Error pixiApp ${toLowerCaseAndRemoveDot((error as Error).message)}`
      );
    }
  });

  it('appHelper should be instance of AppHelper', () => {
    expect(appHelper).to.be.instanceof(AppHelper);
  });

  it('appHelper should have a size 800x600', () => {
    const params = [appHelper.width, appHelper.height];
    expect(params).to.deep.equal([800, 600]);
  });

  it('pixiApp should be undefined in node env', () => {
    expect(pixiApp).to.be.undefined;
  });
});
