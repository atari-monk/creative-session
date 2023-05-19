import { App } from './../pixi-lib/App.js';
import { Renderer } from './../pixi-lib/Renderer.js';
import { KeyboardInput } from './../pixi-lib/keyboardInput.js';
import { PlayerObject } from './../pixi-lib/PlayerObject.js';

const appHelperOptions = {
  width: 800,
  height: 600,
  backgroundColor: 0x000000,
  fullScreen: false,
  canvasId: 'canvas',
};
const green = 0x00ff00;
const blue = 0x0000ff;
const playerOptions = {
  radius: 50,
  speed: 2,
  width: 800,
  height: 600,
  keys: {
    left: 37,
    right: 39,
    up: 38,
    down: 40,
    a: 65,
    d: 68,
    w: 87,
    s: 83,
  },
  color: {
    player: green,
    position: blue,
    direction: blue,
  },
};

const keyboard = new KeyboardInput({
  arrows: false,
});
const appHelper = new App(appHelperOptions);
const pixiApp = new PIXI.Application(appHelper.getPixiAppOptions());
const renderer = new Renderer(appHelper, pixiApp, appHelperOptions);
const player = new PlayerObject(keyboard, playerOptions);
player.position.x = appHelper.width / 2;
player.position.y = appHelper.height / 2;

appHelper.initializeApp(pixiApp, renderer);
appHelper.addGameObject(player);
appHelper.startAnimationLoop();
