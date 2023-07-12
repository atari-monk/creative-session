import { inject, injectable } from 'inversify';
import { ConnectErrorHandler } from '../../socket-logic/ConnectErrorHandler';
import { DisconnectHandler } from '../../socket-logic/DisconnectHandler';
import { SocketLogicManager } from 'atari-monk-pixi-lib';
import { Socket } from 'socket.io-client';

@injectable()
export class SocketLogicCreator {
  constructor(
    @inject(ConnectErrorHandler)
    private readonly connectErrorHandler: ConnectErrorHandler,
    @inject(DisconnectHandler)
    private readonly disconnectHandler: DisconnectHandler,
    @inject(SocketLogicManager)
    private readonly clientSocketLogicManager: SocketLogicManager,
    @inject(Socket)
    private readonly socket: Socket
  ) {}

  public createSocketLogic(): SocketLogicManager {
    this.clientSocketLogicManager.addLogic(this.connectErrorHandler);
    this.clientSocketLogicManager.addLogic(this.disconnectHandler);
    this.clientSocketLogicManager.initializeSocket(this.socket);
    return this.clientSocketLogicManager;
  }
}
