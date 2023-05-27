import * as PIXI from 'pixi.js';
import { AppHelper } from './../../2-pixi-lib/dist/AppHelper.js';
import { Renderer } from './../../2-pixi-lib/dist/Renderer.js';
import { KeyboardInput } from './../../2-pixi-lib/dist/KeyboardInput.js';
import { PlayerObject } from './../../2-pixi-lib/dist/PlayerObject.js';
import { AppHelperOptions } from './../../2-pixi-lib/src/AppHelperOptions.js';

const appHelperOptions: AppHelperOptions = {
  width: 800,
  height: 600,
  backgroundColor: 0x000000,
  fullScreen: false,
  canvasId: 'canvas',
};
const green = 0x00ff00;
const blue = 0x0000ff;
const playerOptions = {
  id: 1,
  radius: 50,
  speed: 2,
  width: 800,
  height: 600,
  keys: {
    left: 'left',
    right: 'right',
    up: 'up',
    down: 'down',
    a: 'a',
    d: 'd',
    w: 'w',
    s: 's',
  },
  color: {
    player: green,
    position: blue,
    direction: blue,
  },
  isPlayable: true,
};

const keyboard = new KeyboardInput();
const appHelper = new AppHelper(appHelperOptions);
const pixiApp = new PIXI.Application(appHelper.getPixiAppOptions());
const player = new PlayerObject(keyboard, playerOptions);
player.position.x = appHelper.width / 2;
player.position.y = appHelper.height / 2;

appHelper.addGameObject(player);

const renderer = new Renderer(appHelper, pixiApp);
appHelper.initializeApp(pixiApp, renderer);

appHelper.startAnimationLoop();
