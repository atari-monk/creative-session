import 'reflect-metadata';
import { expect } from 'chai';
import 'mocha';
import {
  configureContainer,
  container,
} from '../di-container/inversify.config';
import { IAppHelper } from './IAppHelper';
import { AppHelper } from './AppHelper';

describe('App', () => {
  let appHelper: IAppHelper;

  before(() => {
    if (!container.isBound(AppHelper)) {
      configureContainer();
    }
    appHelper = container.resolve<IAppHelper>(AppHelper);
  });

  it('appHelper should be instance of AppHelper', () => {
    expect(appHelper).to.be.instanceof(AppHelper);
  });

  it('appHelper should have a size 800x600', () => {
    const params = [appHelper.width, appHelper.height];
    expect(params).to.deep.equal([800, 600]);
  });
});
