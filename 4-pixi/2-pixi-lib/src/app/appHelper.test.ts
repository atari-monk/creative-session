import 'reflect-metadata';
import { expect } from 'chai';
import { IAppHelper } from './IAppHelper';
import 'mocha';
import { configureContainer, container } from '../di-container/inversify.config';
import { AppHelper } from './AppHelper';

describe('AppHelper', () => {
  let appHelper: IAppHelper;

  before(() => {
    configureContainer();
  });

  beforeEach(() => {
    appHelper = container.resolve<IAppHelper>(AppHelper);
  });

  it('appHelper should be created by container', () => {
    expect(appHelper).to.be.instanceof(AppHelper);

    const params = [
      appHelper.width,
      appHelper.height,
      appHelper.fullScreen,
      appHelper.backgroundColor,
    ];
    expect(params).to.deep.equal([800, 600, false, 0x000000]);
  });
});
