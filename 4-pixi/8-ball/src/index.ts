import * as PIXI from 'pixi.js';
import { Manager, Socket } from 'socket.io-client';
import { EventEmitter } from 'eventemitter3';
import {
  AppHelper,
  AppHelperOptions,
  BallObject,
  BallRenderer,
  EventEmitterLogicManager,
  KeyboardInputV1,
  PlayerObject,
  SocketLogicManager,
} from 'atari-monk-pixi-lib';
import {
  BallManager,
  ConnectErrorHandler,
  DisconnectHandler,
  Environment,
  SocketConfigurator,
  SocketErrorHandler,
  PlayerManager,
  PlayerConnectLogic,
  PlayerMovement,
  PlayerList,
  BallMovement,
  BallVelocity,
  PlayerEventEmitterLogicUnit,
  BallEventEmitterLogicUnit,
} from 'atari-monk-client';

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
const socketManager = new Manager(socketConfigurator.URI);
const socket = new Socket(socketManager, '/');
new SocketErrorHandler(socket);
const playerManager = new PlayerManager();

const clientSocketLogicManager = new SocketLogicManager();
const connectErrorHandler = new ConnectErrorHandler('connect_error');
const disconnectHandler = new DisconnectHandler('disconnect');
clientSocketLogicManager.addLogic(connectErrorHandler);
clientSocketLogicManager.addLogic(disconnectHandler);
clientSocketLogicManager.initializeSocket(socket);

const playerSocketLogicManager = new SocketLogicManager();
const playerConnectLogic = new PlayerConnectLogic(
  'connect',
  socket,
  playerManager
);
const playerMovement = new PlayerMovement('movement', playerManager);
const playerList = new PlayerList('clientIdList', socket, playerManager);
playerSocketLogicManager.addLogic(playerConnectLogic);
playerSocketLogicManager.addLogic(playerMovement);
playerSocketLogicManager.addLogic(playerList);
playerSocketLogicManager.initializeSocket(socket);

const ball = new BallObject(emitter, ballOptions);
ball.position = {
  x: appHelperOptions.width / 2,
  y: appHelperOptions.height / 2,
};
const ballManager = new BallManager(ball);
const ballSocketLogicManager = new SocketLogicManager();
const ballMovement = new BallMovement('ballMovement', ballManager);
const ballVelocity = new BallVelocity('ballVelocity', ballManager);
ballSocketLogicManager.addLogic(ballMovement);
ballSocketLogicManager.addLogic(ballVelocity);
ballSocketLogicManager.initializeSocket(socket);

const playerEmitterLogicManager = new EventEmitterLogicManager();
const playerMovement2 = new PlayerEventEmitterLogicUnit(
  'position-update',
  'movement',
  socket
);
playerEmitterLogicManager.addLogic(playerMovement2);
playerEmitterLogicManager.initializeEmitter(emitter);

const ballEmitterLogicManager = new EventEmitterLogicManager();
const ballMovement2 = new BallEventEmitterLogicUnit(
  'ball-pos-upd',
  'ballMovement',
  socket
);
const ballVelocity2 = new BallEventEmitterLogicUnit(
  'ball-vel-upd',
  'ballVelocity',
  socket
);
ballEmitterLogicManager.addLogic(ballMovement2);
ballEmitterLogicManager.addLogic(ballVelocity2);
ballEmitterLogicManager.initializeEmitter(emitter);

const keyboard = new KeyboardInputV1();
const appHelper = new AppHelper(appHelperOptions);
const pixiApp = new PIXI.Application(appHelper.getPixiAppOptions());
const player = new PlayerObject(keyboard, emitter, playerOptions);
player.position = { x: appHelper.width / 2 - 250, y: appHelper.height / 2 };
const player2 = new PlayerObject(keyboard, emitter, playerOptions2);
player2.position = { x: appHelper.width / 2 + 250, y: appHelper.height / 2 };

appHelper.addGameObject(player);
appHelper.addGameObject(player2);
appHelper.addGameObject(ball);

//for Renderer to work addGameObject must be called before it's ctor
const renderer = new BallRenderer(appHelper, pixiApp);
appHelper.initializeApp(pixiApp, renderer);

playerManager.addPlayerObj(player);
playerManager.addPlayerObj(player2);
appHelper.startAnimationLoop();
