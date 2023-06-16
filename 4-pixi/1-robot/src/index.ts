import * as PIXI from 'pixi.js';
import { AppHelper, AppHelperOptions, Renderer } from 'atari-monk-pixi-lib';
import { Robot } from './Robot';
import { RobotBody } from './RobotBody';

const appHelperOptions: AppHelperOptions = {
  width: 800,
  height: 600,
  backgroundColor: 0x000000,
  fullScreen: false,
  canvasId: 'canvas',
};

const appHelper = new AppHelper(appHelperOptions);
const pixiApp = new PIXI.Application(appHelper.getPixiAppOptions());
const robotBody = new RobotBody();
const robot = new Robot(pixiApp, robotBody);

appHelper.addGameObject(robot);

const renderer = new Renderer(appHelper, pixiApp);
appHelper.initializeApp(pixiApp, renderer);

appHelper.startAnimationLoop();
