import { Manager, Socket } from 'socket.io-client';
import { ballOptions } from 'atari-monk-pixi-lib';
import {
  BallObject,
  BallRenderer,
  EventEmitterLogicManager,
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
import { AppFactory } from './AppFactory';
import { PlayersFactory } from './PlayersFactory';

export class BallGame {
  private appFactory!: AppFactory;
  private playersFactory!: PlayersFactory;

  private ball!: BallObject;
  private ballRenderer!: BallRenderer;

  protected createBall() {
    this.ball = new BallObject(this.playersFactory.emitter, ballOptions);
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
    playerManager.addPlayerObj(this.playersFactory.player1);
    playerManager.addPlayerObj(this.playersFactory.player2);

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
    playerEmitterLogicManager.initializeEmitter(this.playersFactory.emitter);

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
    ballEmitterLogicManager.initializeEmitter(this.playersFactory.emitter);
  }

  constructor() {
    this.initializeObjects();
  }

  protected initializeObjects() {
    this.appFactory = new AppFactory();
    this.appFactory.createApp();
    this.playersFactory = new PlayersFactory();
    this.playersFactory.createPlayers(this.appFactory);
    this.createBall();
    this.createClient();
    this.appFactory.start(this.ballRenderer);
  }
}
