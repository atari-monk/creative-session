import * as PIXI from 'pixi.js';
import { AppHelper } from './../../pixi-lib/AppHelper.js';
import { Renderer } from './../../pixi-lib/Renderer.js';
import { KeyboardInput } from './../../pixi-lib/KeyboardInput.js';
import { PlayerObject } from './../../pixi-lib/PlayerObject.js';
import { BallGameClient } from './../../pixi-lib/BallGameClient.js';
import { BallObject } from './../../pixi-lib/BallObject.js';
import { AppHelperOptions } from './../../pixi-lib/AppHelperOptions.js';

const urlParams = new URLSearchParams(window.location.search);
const playerUrlParam = urlParams.get('player');
if (playerUrlParam !== '1' && playerUrlParam !== '2') {
  throw new Error(
    // prettier-ignore
    'Invalid player URL parameter. ' + 
    'Please specify either "1" or "2".'
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
  isPlayable: playerUrlParam === '1',
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
const keyboard = new KeyboardInput();
const appHelper = new AppHelper(appHelperOptions);
const pixiApp = new PIXI.Application(appHelper.getPixiAppOptions());
const renderer = new Renderer(appHelper, pixiApp, appHelperOptions);
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

appHelper.initializeApp(pixiApp, renderer);
appHelper.addGameObject(player);
appHelper.addGameObject(player2);
appHelper.addGameObject(ball);
client.addPlayerObjs([player, player2]);
client.addBallObj(ball);
appHelper.startAnimationLoop();
