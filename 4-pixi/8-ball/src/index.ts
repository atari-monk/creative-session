import * as PIXI from 'pixi.js';
import { Manager, Socket } from 'socket.io-client';
import { EventEmitter } from 'eventemitter3';
import {
  AppHelper,
  BallObject,
  BallRenderer,
  EventEmitterLogicManager,
  KeyboardInputV1,
  KeyboardInputHandler,
  PlayerObject,
  SocketLogicManager,
  BasicRenderer,
  PositionEmitter,
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
import {
  appHelperOptions,
  playerOptions,
  playerOptions2,
  ballOptions,
  keys
} from './appConfig';

const emitter = new EventEmitter();
const positionEmitter = new PositionEmitter('position-update', emitter);
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

const keyboard = new KeyboardInputHandler(new KeyboardInputV1(), keys);
const appHelper = new AppHelper(appHelperOptions);
const pixiApp = new PIXI.Application(appHelper.getPixiAppOptions());
const basicRenderer = new BasicRenderer();
const player = new PlayerObject(
  basicRenderer,
  keyboard,
  positionEmitter,
  playerOptions
);
player.position = { x: appHelper.width / 2 - 250, y: appHelper.height / 2 };
const player2 = new PlayerObject(
  basicRenderer,
  keyboard,
  positionEmitter,
  playerOptions2
);
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
