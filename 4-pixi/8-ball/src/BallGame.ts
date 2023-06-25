import * as PIXI from 'pixi.js';
import { Manager, Socket } from 'socket.io-client';
import { EventEmitter } from 'eventemitter3';
import {
  appHelperOptions,
  player1Options,
  player2Options,
  ballOptions,
  keys,
  IPlayerOptions,
  screenSize,
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

export class AppFactory {
  private _pixiApp!: PIXI.Application;
  private _appHelper!: AppHelper;

  public get pixiApp() {
    return this._pixiApp;
  }

  public get appHelper() {
    return this._appHelper;
  }

  public createApp() {
    this._appHelper = new AppHelper(appHelperOptions);
    this._pixiApp = new PIXI.Application(this._appHelper.getPixiAppOptions());
  }

  public start(ballRenderer: BallRenderer) {
    this._appHelper.initializeApp(this._pixiApp, ballRenderer);
    this._appHelper.startAnimationLoop();
  }
}

export class BallGame {
  private appFactory!: AppFactory;

  private emitter!: EventEmitter;
  private positionEmitter!: PositionEmitter;
  private playerRenderer!: BasicRenderer;
  private keyboard!: KeyboardInputHandler;
  private player1!: PlayerObject;
  private player2!: PlayerObject;

  protected createPlayers() {
    this.emitter = new EventEmitter();
    this.positionEmitter = new PositionEmitter('position-update', this.emitter);
    this.playerRenderer = new BasicRenderer();
    this.keyboard = new KeyboardInputHandler(new KeyboardInputV1(), keys);
    this.player1 = this.createPlayer1();
    this.player2 = this.createPlayer2();
    this.appFactory.appHelper.addGameObject(this.player1);
    this.appFactory.appHelper.addGameObject(this.player2);
  }

  private ball!: BallObject;
  private ballRenderer!: BallRenderer;

  protected createBall() {
    this.ball = new BallObject(this.emitter, ballOptions);
    this.ball.position = {
      x: ballOptions.screenSize.width / 2,
      y: ballOptions.screenSize.height / 2,
    };
    this.appFactory.appHelper.addGameObject(this.ball);
    this.ballRenderer = new BallRenderer(
      this.appFactory.appHelper,
      this.appFactory.pixiApp
    );
  }

  protected createClient() {
    const socketConfigurator = new SocketConfigurator({
      environment: Environment.Development,
    });
    const socketManager = new Manager(socketConfigurator.URI);
    const socket = new Socket(socketManager, '/');
    new SocketErrorHandler(socket);
    const playerManager = new PlayerManager();
    playerManager.addPlayerObj(this.player1);
    playerManager.addPlayerObj(this.player2);

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

    const ballManager = new BallManager(this.ball);
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
    playerEmitterLogicManager.initializeEmitter(this.emitter);

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
    ballEmitterLogicManager.initializeEmitter(this.emitter);
  }

  constructor() {
    this.initializeObjects();
  }

  protected initializeObjects() {
    this.appFactory = new AppFactory();
    this.appFactory.createApp();
    this.createPlayers();
    this.createBall();
    this.createClient();
    this.appFactory.start(this.ballRenderer);
  }

  protected createPlayer(playerOptions: IPlayerOptions, offsetX: number) {
    const playerComputation = new PlayerComputation(
      this.keyboard,
      this.positionEmitter,
      playerOptions
    );
    const player = new PlayerObject(
      this.playerRenderer,
      playerComputation,
      playerOptions
    );
    player.position = {
      x: screenSize.width / 2 + offsetX,
      y: screenSize.height / 2,
    };
    return player;
  }

  protected createPlayer1() {
    return this.createPlayer(player1Options, -250);
  }

  protected createPlayer2() {
    return this.createPlayer(player2Options, 250);
  }
}
