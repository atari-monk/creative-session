import { Socket } from 'socket.io';
import { SrvSctLogicUnit } from './srv-sct-logic/SrvSctLogicUnit';
import { ClientManager } from './ClientManager';

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
