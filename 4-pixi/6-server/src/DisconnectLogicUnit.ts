import { Socket } from 'socket.io';
import { ClientManager } from './ClientManager';
import { SrvSctLogicUnit } from './lib/srv-sct-logic/SrvSctLogicUnit';

export class DisconnectLogicUnit extends SrvSctLogicUnit {
  constructor(
    eventName: string,
    private readonly clientManager: ClientManager
  ) {
    super(eventName);
  }

  protected logicUnit(socket: Socket) {
    const clientId = socket.id;
    this.clientManager.handleClientDisconnection(clientId);
    this.clientManager.logClients();
  }
}
