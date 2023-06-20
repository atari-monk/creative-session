import * as PIXI from 'pixi.js';
import { Manager, Socket } from 'socket.io-client';
import { EventEmitter } from 'eventemitter3';
import {
  appHelperOptions,
  player1Options,
  player2Options,
  ballOptions,
  keys,
} from 'atari-monk-pixi-lib';
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
  PlayerComputation,
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

export class BallGame {
  private emitter: EventEmitter;
  private positionEmitter: PositionEmitter;
  private socketConfigurator: SocketConfigurator;
  private socketManager: Manager;
  private socket: Socket;
  private playerManager: PlayerManager;
  private clientSocketLogicManager: SocketLogicManager;
  private connectErrorHandler: ConnectErrorHandler;
  private disconnectHandler: DisconnectHandler;
  private playerSocketLogicManager: SocketLogicManager;
  private playerConnectLogic: PlayerConnectLogic;
  private playerMovement: PlayerMovement;
  private playerList: PlayerList;
  private ball: BallObject;
  private ballManager: BallManager;
  private ballSocketLogicManager: SocketLogicManager;
  private ballMovement: BallMovement;
  private ballVelocity: BallVelocity;
  private playerEmitterLogicManager: EventEmitterLogicManager;
  private playerMovement2: PlayerEventEmitterLogicUnit;
  private ballEmitterLogicManager: EventEmitterLogicManager;
  private ballMovement2: BallEventEmitterLogicUnit;
  private ballVelocity2: BallEventEmitterLogicUnit;
  private keyboard: KeyboardInputHandler;
  private appHelper: AppHelper;
  private pixiApp: PIXI.Application;
  private playerRenderer: BasicRenderer;
  private player1Computation: PlayerComputation;
  private player2Computation: PlayerComputation;
  private player: PlayerObject;
  private player2: PlayerObject;
  private renderer: BallRenderer;

  constructor() {
    this.emitter = new EventEmitter();
    this.positionEmitter = new PositionEmitter('position-update', this.emitter);
    this.socketConfigurator = new SocketConfigurator({
      environment: Environment.Development,
    });
    this.socketManager = new Manager(this.socketConfigurator.URI);
    this.socket = new Socket(this.socketManager, '/');
    new SocketErrorHandler(this.socket);
    this.playerManager = new PlayerManager();

    this.clientSocketLogicManager = new SocketLogicManager();
    this.connectErrorHandler = new ConnectErrorHandler('connect_error');
    this.disconnectHandler = new DisconnectHandler('disconnect');
    this.clientSocketLogicManager.addLogic(this.connectErrorHandler);
    this.clientSocketLogicManager.addLogic(this.disconnectHandler);
    this.clientSocketLogicManager.initializeSocket(this.socket);

    this.playerSocketLogicManager = new SocketLogicManager();
    this.playerConnectLogic = new PlayerConnectLogic(
      'connect',
      this.socket,
      this.playerManager
    );
    this.playerMovement = new PlayerMovement('movement', this.playerManager);
    this.playerList = new PlayerList(
      'clientIdList',
      this.socket,
      this.playerManager
    );
    this.playerSocketLogicManager.addLogic(this.playerConnectLogic);
    this.playerSocketLogicManager.addLogic(this.playerMovement);
    this.playerSocketLogicManager.addLogic(this.playerList);
    this.playerSocketLogicManager.initializeSocket(this.socket);

    this.ball = new BallObject(this.emitter, ballOptions);
    this.ball.position = {
      x: ballOptions.screenSize.width / 2,
      y: ballOptions.screenSize.height / 2,
    };
    this.ballManager = new BallManager(this.ball);
    this.ballSocketLogicManager = new SocketLogicManager();
    this.ballMovement = new BallMovement('ballMovement', this.ballManager);
    this.ballVelocity = new BallVelocity('ballVelocity', this.ballManager);
    this.ballSocketLogicManager.addLogic(this.ballMovement);
    this.ballSocketLogicManager.addLogic(this.ballVelocity);
    this.ballSocketLogicManager.initializeSocket(this.socket);

    this.playerEmitterLogicManager = new EventEmitterLogicManager();
    this.playerMovement2 = new PlayerEventEmitterLogicUnit(
      'position-update',
      'movement',
      this.socket
    );
    this.playerEmitterLogicManager.addLogic(this.playerMovement2);
    this.playerEmitterLogicManager.initializeEmitter(this.emitter);

    this.ballEmitterLogicManager = new EventEmitterLogicManager();
    this.ballMovement2 = new BallEventEmitterLogicUnit(
      'ball-pos-upd',
      'ballMovement',
      this.socket
    );
    this.ballVelocity2 = new BallEventEmitterLogicUnit(
      'ball-vel-upd',
      'ballVelocity',
      this.socket
    );
    this.ballEmitterLogicManager.addLogic(this.ballMovement2);
    this.ballEmitterLogicManager.addLogic(this.ballVelocity2);
    this.ballEmitterLogicManager.initializeEmitter(this.emitter);

    this.keyboard = new KeyboardInputHandler(new KeyboardInputV1(), keys);
    this.appHelper = new AppHelper(appHelperOptions);
    this.pixiApp = new PIXI.Application(this.appHelper.getPixiAppOptions());
    this.playerRenderer = new BasicRenderer();
    this.player1Computation = new PlayerComputation(
      this.keyboard,
      this.positionEmitter,
      player1Options
    );
    this.player2Computation = new PlayerComputation(
      this.keyboard,
      this.positionEmitter,
      player2Options
    );
    this.player = new PlayerObject(
      this.playerRenderer,
      this.player1Computation,
      player1Options
    );
    this.player.position = {
      x: this.appHelper.width / 2 - 250,
      y: this.appHelper.height / 2,
    };
    this.player2 = new PlayerObject(
      this.playerRenderer,
      this.player2Computation,
      player2Options
    );
    this.player2.position = {
      x: this.appHelper.width / 2 + 250,
      y: this.appHelper.height / 2,
    };

    this.appHelper.addGameObject(this.player);
    this.appHelper.addGameObject(this.player2);
    this.appHelper.addGameObject(this.ball);

    // For Renderer to work, addGameObject must be called before its constructor
    this.renderer = new BallRenderer(this.appHelper, this.pixiApp);
    this.appHelper.initializeApp(this.pixiApp, this.renderer);

    this.playerManager.addPlayerObj(this.player);
    this.playerManager.addPlayerObj(this.player2);
    this.appHelper.startAnimationLoop();
  }
}
