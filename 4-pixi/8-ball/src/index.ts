import 'reflect-metadata';
import * as configUtils from './config/configUtils';
// import { BallGame as BallGameV1 } from './V1/BallGame';
import { BallGame as BallGameV2 } from './V2/BallGame';

async function initializeConfig(): Promise<void> {
  const config = await configUtils.fetchConfig();

  if (config.factoryVersion === 'v1') {
    //new BallGameV1();
  } else if (config.factoryVersion === 'v2') {
    new BallGameV2();
  } else {
    console.error('Invalid factory version specified in the config.');
  }
}

initializeConfig();