import 'reflect-metadata';
import { expect } from 'chai';
import { IAppHelper } from './IAppHelper';
import 'mocha';
import { container } from '../di-container/inversify.config';
import { AppHelper } from './AppHelper';

describe('AppHelper', () => {
  let appHelper: IAppHelper;

  beforeEach(() => {
    appHelper = container.resolve<IAppHelper>(AppHelper);
  });

  it('appHelper should be created by container', () => {
    const params = [appHelper.width, appHelper.height];
    expect(params).to.deep.equal([800, 600]);
  });
});
