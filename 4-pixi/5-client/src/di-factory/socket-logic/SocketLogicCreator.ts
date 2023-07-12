import { inject, injectable } from 'inversify';
import { ConnectErrorHandler } from '../../socket-logic/ConnectErrorHandler';
import { DisconnectHandler } from '../../socket-logic/DisconnectHandler';
import { SocketLogicManager } from 'atari-monk-pixi-lib';
import { Socket } from 'socket.io-client';
import { ICreate } from 'atari-monk-pixi-lib/factory/ICreate';

@injectable()
export class SocketLogicCreator implements ICreate<SocketLogicManager> {
  constructor(
    @inject(ConnectErrorHandler)
    private readonly connectErrorHandler: ConnectErrorHandler,
    @inject(DisconnectHandler)
    private readonly disconnectHandler: DisconnectHandler,
    @inject(SocketLogicManager)
    private readonly socketLogicManager: SocketLogicManager,
    @inject(Socket)
    private readonly socket: Socket
  ) {}

  public create(): SocketLogicManager {
    const m = this.socketLogicManager;
    
    m.addLogic(this.connectErrorHandler);
    m.addLogic(this.disconnectHandler);
    m.initializeSocket(this.socket);
    return m;
  }
}
