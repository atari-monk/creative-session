import * as PIXI from 'pixi.js';
import { AppHelper } from './../../2-pixi-lib/dist/AppHelper.js';
import { Renderer } from './../../2-pixi-lib/dist/Renderer.js';
import { PixiRectangle } from './../../2-pixi-lib/dist/PixiRectangle.js';
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
const rectangle = new PixiRectangle(pixiApp);

appHelper.addGameObject(rectangle);

const renderer = new Renderer(appHelper, pixiApp);
appHelper.initializeApp(pixiApp, renderer);

appHelper.startAnimationLoop();
