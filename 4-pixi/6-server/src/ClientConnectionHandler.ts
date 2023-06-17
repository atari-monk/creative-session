import { Server, Socket } from 'socket.io';
import { ServerLogicUnit } from './server-logic/SocketLogicUnit';
import { SrvSctLogicManager } from './srv-sct-logic/SrvSctLogicManager';
import { ClientManager } from './ClientManager';

export class ClientConnectionHandler extends ServerLogicUnit {
  constructor(
    private readonly server: Server,
    private readonly clientManager: ClientManager,
    private readonly srcSctLogicManager: SrvSctLogicManager,
    private readonly playerLimit: number,
    private readonly delayDisconnect: number
  ) {
    super('connection');
  }

  protected logicUnit(socket: Socket) {
    if (this.clientManager.getClientCount() < this.playerLimit) {
      this.srcSctLogicManager.initializeSocket(socket);
      this.handleConnection(socket);
    } else {
      socket.disconnect();
      console.log('Disconnected player exceeding the limit');
    }
  }

  private handleConnection(socket: Socket) {
    const clientId = socket.id;
    this.clientManager.storeClient(clientId, socket);
    this.clientManager.handleClientDisconnection(
      clientId,
      this.delayDisconnect
    );
    this.emitClientIdList(this.clientManager.getClientIdList());
    this.clientManager.logClientsArray();
  }

  private emitClientIdList(clientIdList: string[]) {
    this.server.emit('clientIdList', clientIdList);
  }
}
