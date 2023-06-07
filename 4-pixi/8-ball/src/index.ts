import * as PIXI from 'pixi.js';
import { AppHelper } from './../../2-pixi-lib/dist/AppHelper.js';
import { BallRenderer } from './../../2-pixi-lib/dist/BallRenderer.js';
import { KeyboardInputV1 } from './../../2-pixi-lib/dist/KeyboardInputV1.js';
import { PlayerObject } from './../../2-pixi-lib/dist/PlayerObject.js';
import { SocketConnection } from './../../5-client/dist/SocketConnection.js';
import { PlayerClient } from './../../5-client/dist/PlayerClient.js';
import { BallClient } from './../../5-client/dist/BallClient.js';
import { BallObject } from './../../2-pixi-lib/dist/BallObject.js';
import { AppHelperOptions } from './../../2-pixi-lib/dist/AppHelperOptions.js';
import { EventEmitter } from 'eventemitter3';
import { Environment } from '../../5-client/dist/Environment.js';
import { SocketConfigurator } from '../../5-client/dist/SocketConfigurator.js';
import { Manager, Socket } from 'socket.io-client';

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
  id: '1',
  playerNr: 1,
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
  id: '2',
  playerNr: 2,
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
  id: '3',
  playerNr: 0,
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
  keys: undefined,
  isPlayable: false,
  keyboard: undefined,
};

const emitter = new EventEmitter();
const socketConfigurator = new SocketConfigurator({
  environment: Environment.Development,
});
const manager = new Manager(socketConfigurator.URI);
const socket = new Socket(manager, '/');
const socketConnection = new SocketConnection(socket);
const playerClient = new PlayerClient(socketConnection, emitter);
const ballClient = new BallClient(socketConnection, emitter);
socket.connect();
const keyboard = new KeyboardInputV1();
const appHelper = new AppHelper(appHelperOptions);
const pixiApp = new PIXI.Application(appHelper.getPixiAppOptions());
const player = new PlayerObject(keyboard, emitter, playerOptions);
player.position = { x: appHelper.width / 2 - 250, y: appHelper.height / 2 };
const player2 = new PlayerObject(keyboard, emitter, playerOptions2);
player2.position = { x: appHelper.width / 2 + 250, y: appHelper.height / 2 };
const ball = new BallObject(emitter, ballOptions);
ball.position = { x: appHelper.width / 2, y: appHelper.height / 2 };

appHelper.addGameObject(player);
appHelper.addGameObject(player2);
appHelper.addGameObject(ball);

//for Renderer to work addGameObject must be called before it's ctor
const renderer = new BallRenderer(appHelper, pixiApp);
appHelper.initializeApp(pixiApp, renderer);

playerClient.addPlayerObjs([player, player2]);
ballClient.addBallObj(ball);
appHelper.startAnimationLoop();
