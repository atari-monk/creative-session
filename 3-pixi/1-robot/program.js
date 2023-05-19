import { App } from './../pixi-lib/App.js';
import { Renderer } from './../pixi-lib/Renderer.js';
import { Robot } from './Robot.js';
import { RobotBody } from './RobotBody.js';

const appHelperOptions = {
  width: 800,
  height: 600,
  backgroundColor: 0x000000,
  fullScreen: false,
  canvasId: 'canvas',
};

const appHelper = new App(appHelperOptions);
const pixiApp = new PIXI.Application(appHelper.getPixiAppOptions());
const renderer = new Renderer(appHelper, pixiApp, appHelperOptions);
const robotBody = new RobotBody();
const robot = new Robot(pixiApp, robotBody);

appHelper.initializeApp(pixiApp, renderer);
appHelper.addGameObject(robot);
appHelper.startAnimationLoop();
