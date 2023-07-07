import { Manager, Socket } from 'socket.io-client';
import {
  EventEmitterLogicManager,
  IBall,
  IPlayer,
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
import EventEmitter from 'eventemitter3';
import { IPlayerNpc } from 'atari-monk-pixi-lib/player-npc/IPlayerNpc';

export class ClientFactory {
  private socket: Socket;

  constructor(
    private readonly eventEmitter: EventEmitter,
    player: IPlayer,
    playerNpc: IPlayerNpc,
    ball: IBall
  ) {
    this.socket = this.produceSocketLogic();
    this.producePlayerSocketLogic(player, playerNpc);
    this.produceBallSocketLogic(ball);
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

  private producePlayerSocketLogic(player: IPlayer, playerNpc: IPlayerNpc) {
    const playerManager = this.createPlayerManager(player, playerNpc);
    const playerSocketLogicManager =
      this.createPlayerSocketLogic(playerManager);
    const playerEmitterLogicManager = this.createPlayerEmitterLogic();
    playerSocketLogicManager.initializeSocket(this.socket);
    playerEmitterLogicManager.initializeEmitter(this.eventEmitter);
  }

  private createPlayerManager(player: IPlayer, playerNpc: IPlayerNpc) {
    const playerManager = new PlayerManager();
    playerManager.addPlayer('0', player);
    playerManager.addPlayerNpc('0', playerNpc);
    return playerManager;
  }

  private createPlayerSocketLogic(playerManager: PlayerManager) {
    const playerSocketLogicManager = new SocketLogicManager();
    const playerConnectLogic = new PlayerConnectLogic(
      'connect',
      this.socket,
      playerManager
    );
    const playerMovement = new PlayerMovement('movement', playerManager);
    const playerList = new PlayerList(
      'clientIdList',
      this.socket,
      playerManager
    );
    playerSocketLogicManager.addLogic(playerConnectLogic);
    playerSocketLogicManager.addLogic(playerMovement);
    playerSocketLogicManager.addLogic(playerList);
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

  private produceBallSocketLogic(ball: IBall) {
    const ballManager = new BallManager(ball);
    const ballSocketLogicManager = this.createBallSocketLogic(ballManager);
    const ballEmitterLogicManager = this.createBallEmitterLogic();
    ballSocketLogicManager.initializeSocket(this.socket);
    ballEmitterLogicManager.initializeEmitter(this.eventEmitter);
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
