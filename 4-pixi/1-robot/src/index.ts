import * as PIXI from 'pixi.js';
import { AppHelper } from './../../2-pixi-lib/dist/AppHelper.js';
import { Renderer } from './../../2-pixi-lib/dist/Renderer.js';
import { Robot } from './Robot.js';
import { RobotBody } from './RobotBody.js';
import { AppHelperOptions } from './../../2-pixi-lib/src/AppHelperOptions.js';

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
