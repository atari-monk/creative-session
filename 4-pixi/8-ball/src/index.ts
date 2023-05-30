import * as PIXI from 'pixi.js';
import { AppHelper } from './../../2-pixi-lib/dist/AppHelper.js';
import { BallRenderer } from './../../2-pixi-lib/dist/BallRenderer.js';
import { KeyboardInputV1 } from './../../2-pixi-lib/dist/KeyboardInputV1.js';
import { PlayerObject } from './../../2-pixi-lib/dist/PlayerObject.js';
import { BallGameClient } from './../../5-client/dist/BallGameClient.js';
import { BallObject } from './../../2-pixi-lib/dist/BallObject.js';
import { AppHelperOptions } from './../../2-pixi-lib/src/AppHelperOptions.js';

const urlParams = new URLSearchParams(window.location.search);
const playerUrlParam = urlParams.get('player');
if (playerUrlParam !== '1' && playerUrlParam !== '2') {
  throw new Error(
    'Invalid player URL parameter. Please specify either "1" or "2".'
  );
}
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
    left: 'ArrowLeft',
    right: 'ArrowRight',
    up: 'ArrowUp',
    down: 'ArrowDown',
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
  isPlayable: playerUrlParam === '1',
};
const playerOptions2 = {
  id: 2,
  radius: 50,
  speed: 2,
  width: 800,
  height: 600,
  keys: {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    up: 'ArrowUp',
    down: 'ArrowDown',
    a: 'a',
    d: 'd',
    w: 'w',
    s: 's',
  },
  color: {
    player: 0xff0000,
    position: 0x0000ff,
    direction: 0x0000ff,
  },
  isPlayable: playerUrlParam === '2',
};
const ballOptions = {
  id: 3,
  radius: 20,
  speed: 2,
  color: {
    player: 0xff0000,
    position: 0x0000ff,
    direction: 0x0000ff,
  },
  isBall: true,
  width: 800,
  height: 600,
};

const client = new BallGameClient();
const keyboard = new KeyboardInputV1();
const appHelper = new AppHelper(appHelperOptions);
const pixiApp = new PIXI.Application(appHelper.getPixiAppOptions());
const player = new PlayerObject(keyboard, playerOptions);
player.position.x = appHelper.width / 2 - 250;
player.position.y = appHelper.height / 2;
const player2 = new PlayerObject(keyboard, playerOptions2);
player2.position.x = appHelper.width / 2 + 250;
player2.position.y = appHelper.height / 2;
const ball = new BallObject(ballOptions);
ball.position.x = appHelper.width / 2;
ball.position.y = appHelper.height / 2;
ball.client = client;

appHelper.addGameObject(player);
appHelper.addGameObject(player2);
appHelper.addGameObject(ball);

//for Renderer to work addGameObject must be called before it's ctor
const renderer = new BallRenderer(appHelper, pixiApp);
appHelper.initializeApp(pixiApp, renderer);

client.addPlayerObjs([player, player2]);
client.addBallObj(ball);
appHelper.startAnimationLoop();