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

  public getClientList(): string[] {
    return Object.keys(this.clients);
  }

  public storeClient(clientId: string, socket: Socket) {
    this.clients[clientId] = { socket, state: 'Connected' };
  }

  public handleClientDisconnection(clientId: string) {
    const client = this.clients[clientId];
    if (!client) return;
    client.state = 'Disconnected';
    delete this.clients[clientId];
  }

  public logClients() {
    const clientsArray = this.getClientList().map((clientId) => ({
      clientId,
      state: this.clients[clientId].state,
    }));
    console.log('Clients: ', clientsArray);
  }
}
