import { Manager, Socket } from 'socket.io-client';
import {
  EventEmitterLogicManager,
  IBall,
  IPlayer,
  IPlayerNpc,
  SocketLogicManager,
} from 'atari-monk-pixi-lib';
import EventEmitter from 'eventemitter3';
import { SocketConfigurator } from '../SocketConfigurator';
import { Environment } from '../Environment';
import { SocketErrorHandler } from '../SocketErrorHandler';
import { ConnectErrorHandler } from '../socket-logic/ConnectErrorHandler';
import { DisconnectHandler } from '../socket-logic/DisconnectHandler';
import { PlayerManager } from '../PlayerManager';
import { PlayerConnectLogic } from '../socket-logic/PlayerConnectLogic';
import { PlayerList } from '../socket-logic/PlayerList';
import { PlayerMovement } from '../socket-logic/PlayerMovement';
import { PlayerEventEmitterLogicUnit } from '../emitter-logic/PlayerEventEmitterLogicUnit';
import { BallManager } from '../BallManager';
import { BallMovement } from '../socket-logic/BallMovement';
import { BallVelocity } from '../socket-logic/BallVelocity';
import { BallEventEmitterLogicUnit } from '../emitter-logic/BallEventEmitterLogicUnit';

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
