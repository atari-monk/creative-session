import { Socket } from 'socket.io';

export class ClientManager {
  private readonly clients: {
    [clientId: string]: { socket: Socket; state: string };
  };

  constructor() {
    this.clients = {};
  }

  public getClientCount(): number {
    return Object.keys(this.clients).length;
  }

  public storeClient(clientId: string, socket: Socket) {
    this.clients[clientId] = { socket, state: 'Connecting' };
  }

  public handleClientDisconnection(clientId: string, delayDisconnect: number) {
    this.clients[clientId].socket.on('disconnect', () => {
      this.clients[clientId].state = 'Disconnecting';
      setTimeout(() => {
        delete this.clients[clientId];
        this.logClientsArray();
      }, delayDisconnect);
    });
  }

  public logClientsArray() {
    const clientsArray = this.getClientIdList().map((clientId) => ({
      clientId,
      state: this.clients[clientId].state,
    }));
    console.log('Clients Array:', clientsArray);
  }

  public getClientIdList(): string[] {
    return Object.keys(this.clients);
  }
}
