import { Server, Socket } from 'socket.io';
import { ServerLogicUnit } from './server-logic/SocketLogicUnit';
import { SrvSctLogicManager } from './srv-sct-logic/SrvSctLogicManager';
import { ClientManager } from './ClientManager';

export class ClientConnectionHandler extends ServerLogicUnit {
  constructor(
    eventName: string,
    private readonly server: Server,
    private readonly clientManager: ClientManager,
    private readonly srcSctLogicManager: SrvSctLogicManager,
    private readonly playerLimit: number
  ) {
    super(eventName);
  }

  protected logicUnit(socket: Socket) {
    if (this.clientManager.getClientCount() < this.playerLimit) {
      this.handleConnection(socket);
      this.srcSctLogicManager.initializeSocket(socket);
    } else {
      socket.disconnect();
      console.log('Disconnected player exceeding the limit');
    }
  }

  private handleConnection(socket: Socket) {
    const clientId = socket.id;
    this.clientManager.storeClient(clientId, socket);
    this.emitClientIdList(this.clientManager.getClientList());
    this.clientManager.logClients();
  }

  private emitClientIdList(clientIdList: string[]) {
    this.server.emit('clientIdList', clientIdList);
  }
}
