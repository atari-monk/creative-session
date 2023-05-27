import * as PIXI from 'pixi.js';
import { AppHelper } from './../../2-pixi-lib/dist/AppHelper.js';
import { Renderer } from './../../2-pixi-lib/dist/Renderer.js';
import { KeyboardInput } from './../../2-pixi-lib/dist/KeyboardInput.js';
import { PlayerObject } from './../../2-pixi-lib/dist/PlayerObject.js';
import { GameClient } from './../../4-client/dist/GameClient.js';
import { AppHelperOptions } from './../../2-pixi-lib/src/AppHelperOptions.js';

const urlParams = new URLSearchParams(window.location.search);
const playerParam = urlParams.get('player');
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
  isPlayable: playerParam === '1',
};
const playerOptions2 = {
  id: 2,
  radius: 50,
  speed: 2,
  width: 800,
  height: 600,
  keys: {
    a: 65,
    d: 68,
    w: 87,
    s: 83,
    left: 37,
    right: 39,
    up: 38,
    down: 40,
  },
  color: {
    player: 0xff0000,
    position: 0x0000ff,
    direction: 0x0000ff,
  },
  isPlayable: playerParam === '2',
};

const client = new GameClient();
const keyboard = new KeyboardInput();
const appHelper = new AppHelper(appHelperOptions);
const pixiApp = new PIXI.Application(appHelper.getPixiAppOptions());
const player = new PlayerObject(keyboard, playerOptions);
player.position.x = appHelper.width / 2;
player.position.y = appHelper.height / 2;
const player2 = new PlayerObject(keyboard, playerOptions2);
player2.position.x = appHelper.width / 2;
player2.position.y = appHelper.height / 2 + 100;

appHelper.addGameObject(player);
appHelper.addGameObject(player2);

//for Renderer to work addGameObject must be called before it's ctor
const renderer = new Renderer(appHelper, pixiApp);
appHelper.initializeApp(pixiApp, renderer);

client.addPlayerObjs([player, player2]);
appHelper.startAnimationLoop();
