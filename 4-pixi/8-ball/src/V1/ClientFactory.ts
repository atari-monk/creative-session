import { Manager, Socket } from 'socket.io-client';
import {
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
import { PlayersFactory } from './PlayersFactory';
import { BallFactory } from './BallFactory';

export class ClientFactory {
  private socket: Socket;

  constructor(playersFactory: PlayersFactory, ballFactory: BallFactory) {
    this.socket = this.produceSocketLogic();
    this.producePlayerSocketLogic(playersFactory);
    this.produceBallSocketLogic(ballFactory, playersFactory);
  }

  private produceSocketLogic() {
    const socket = this.createSocket();
    const clientSocketLogicManager = this.createSocketLogic();
    clientSocketLogicManager.initializeSocket(socket);
    return socket;
  }

  private createSocket() {
    const socketConfigurator = new SocketConfigurator({
      environment: Environment.Development,
    });
    const socketManager = new Manager(socketConfigurator.URI);
    const socket = new Socket(socketManager, '/');
    new SocketErrorHandler(socket);
    return socket;
  }

  private createSocketLogic() {
    const clientSocketLogicManager = new SocketLogicManager();
    const connectErrorHandler = new ConnectErrorHandler('connect_error');
    const disconnectHandler = new DisconnectHandler('disconnect');
    clientSocketLogicManager.addLogic(connectErrorHandler);
    clientSocketLogicManager.addLogic(disconnectHandler);
    return clientSocketLogicManager;
  }

  private producePlayerSocketLogic(playersFactory: PlayersFactory) {
    const playerManager = this.createPlayerManager(playersFactory);
    const playerSocketLogicManager =
      this.createPlayerSocketLogic(playerManager);
    const playerEmitterLogicManager = this.createPlayerEmitterLogic();
    playerSocketLogicManager.initializeSocket(this.socket);
    playerEmitterLogicManager.initializeEmitter(playersFactory.emitter);
  }

  private createPlayerManager(playersFactory: PlayersFactory) {
    const playerManager = new PlayerManager();
    playerManager.addPlayerObj(playersFactory.player1);
    playerManager.addPlayerObj(playersFactory.player2);
    return playerManager;
  }

  private createPlayerSocketLogic(playerManager: PlayerManager) {
    const playerSocketLogicManager = new SocketLogicManager();
    const playerConnectLogic = new PlayerConnectLogic(
      'connect',
      this.socket,
      playerManager
    );
    const playerList = new PlayerList(
      'clientIdList',
      this.socket,
      playerManager
    );
    const playerMovement = new PlayerMovement('movement', playerManager);
    playerSocketLogicManager.addLogic(playerConnectLogic);
    playerSocketLogicManager.addLogic(playerList);
    playerSocketLogicManager.addLogic(playerMovement);
    return playerSocketLogicManager;
  }

  private createPlayerEmitterLogic() {
    const playerEmitterLogicManager = new EventEmitterLogicManager();
    const playerMovement2 = new PlayerEventEmitterLogicUnit(
      'position-update',
      'movement',
      this.socket
    );
    playerEmitterLogicManager.addLogic(playerMovement2);
    return playerEmitterLogicManager;
  }

  private produceBallSocketLogic(
    ballFactory: BallFactory,
    playersFactory: PlayersFactory
  ) {
    const ballManager = new BallManager(ballFactory.ball);
    const ballSocketLogicManager = this.createBallSocketLogic(ballManager);
    const ballEmitterLogicManager = this.createBallEmitterLogic();
    ballSocketLogicManager.initializeSocket(this.socket);
    ballEmitterLogicManager.initializeEmitter(playersFactory.emitter);
  }

  private createBallSocketLogic(ballManager: BallManager) {
    const ballSocketLogicManager = new SocketLogicManager();
    const ballMovement = new BallMovement('ballMovement', ballManager);
    const ballVelocity = new BallVelocity('ballVelocity', ballManager);
    ballSocketLogicManager.addLogic(ballMovement);
    ballSocketLogicManager.addLogic(ballVelocity);
    return ballSocketLogicManager;
  }

  private createBallEmitterLogic() {
    const ballEmitterLogicManager = new EventEmitterLogicManager();
    const ballMovement2 = new BallEventEmitterLogicUnit(
      'ball-pos-upd',
      'ballMovement',
      this.socket
    );
    const ballVelocity2 = new BallEventEmitterLogicUnit(
      'ball-vel-upd',
      'ballVelocity',
      this.socket
    );
    ballEmitterLogicManager.addLogic(ballMovement2);
    ballEmitterLogicManager.addLogic(ballVelocity2);
    return ballEmitterLogicManager;
  }
}
