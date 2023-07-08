import 'reflect-metadata';
import * as configUtils from './config/configUtils';
import { BallGameSimpleFactory } from './simple-factory/BallGameSimpleFactory';
import { BallGameDIFactory } from './di-factory/BallGameDIFactory';

async function initializeConfig(): Promise<void> {
  const config = await configUtils.fetchConfig();

  if (config.factoryVersion === 'simple-factory') {
    new BallGameSimpleFactory();
  } else if (config.factoryVersion === 'di-factory') {
    new BallGameDIFactory();
  } else {
    console.error('Invalid factory version specified in the config.');
  }
}

initializeConfig();
