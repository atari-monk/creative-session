import * as PIXI from 'pixi.js';
import { AppHelper } from '../../pixi-lib/AppHelper.js';
import { Renderer } from '../../pixi-lib/Renderer.js';
import { KeyboardInput } from '../../pixi-lib/KeyboardInput.js';
import { PlayerObject } from '../../pixi-lib/PlayerObject.js';
import { GameClient } from '../../pixi-lib/GameClient.js';

const urlParams = new URLSearchParams(window.location.search);
const playerParam = urlParams.get('player');
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
  id: 1,
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
const pixiApp = new PIXI.Application(appHelper.getPixiAppOptions() as any);
const renderer = new Renderer(appHelper, pixiApp, appHelperOptions);
const player = new PlayerObject(keyboard, playerOptions);
player.position.x = appHelper.width / 2;
player.position.y = appHelper.height / 2;
const player2 = new PlayerObject(keyboard, playerOptions2);
player2.position.x = appHelper.width / 2;
player2.position.y = appHelper.height / 2 + 100;

appHelper.initializeApp(pixiApp, renderer);
appHelper.addGameObject(player);
appHelper.addGameObject(player2);
client.addPlayerObjs([player, player2]);
appHelper.startAnimationLoop();
