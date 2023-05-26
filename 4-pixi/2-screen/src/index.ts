import * as PIXI from 'pixi.js';
import { AppHelper } from '../../pixi-lib/AppHelper.js';
import { Renderer } from '../../pixi-lib/Renderer.js';
import { PixiRectangle } from '../../pixi-lib/PixiRectangle.js';

const appHelperOptions = {
  width: 800,
  height: 600,
  backgroundColor: 0x000000,
  fullScreen: false,
  canvasId: 'canvas',
};

const appHelper = new AppHelper(appHelperOptions);
const pixiApp = new PIXI.Application(appHelper.getPixiAppOptions() as any);
const renderer = new Renderer(appHelper, pixiApp, appHelperOptions);
const rectangle = new PixiRectangle(pixiApp);

appHelper.initializeApp(pixiApp, renderer);
appHelper.addGameObject(rectangle);
appHelper.startAnimationLoop();
