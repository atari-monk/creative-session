import { Server as SocketIOServer, Socket } from 'socket.io';
import { VectorData } from './../../2-pixi-lib/dist/VectorData.js';

export class ClientConnectionHandler {
  private readonly clients: {
    [clientId: string]: { socket: Socket; state: string };
  };

  constructor(
    private readonly serverSIO: SocketIOServer,
    private readonly playerLimit: Number,
    private readonly delayDisconnect: number
  ) {
    this.serverSIO = serverSIO;
    this.playerLimit = playerLimit;
    this.delayDisconnect = delayDisconnect;
    this.clients = {};
  }

  private getClientCount(): Number {
    return Object.keys(this.clients).length;
  }

  handleClientConnection(socket: Socket) {
    if (this.getClientCount() < this.playerLimit) {
      this.handleConnection(socket);
    } else {
      socket.disconnect();
      console.log('Disconnected player exceeding the limit');
    }
  }

  private handleConnection(socket: Socket) {
    const clientId = socket.id;
    this.storeClient(clientId, socket);
    this.handleClientDisconnection(clientId);
    this.handlePlayerMovement(socket);
    this.emitClientIdList(this.getClientIdList());
    this.logClientsArray();
    //todo: refactor for OCP
    this.handleBallMovement(socket);
    this.handleBallVelocity(socket);
  }

  private handleBallMovement(socket: Socket): void {
    socket.on('ballMovement', (newPosition: { x: number; y: number }) => {
      socket.broadcast.emit('ballMovement', newPosition);
    });
  }

  private handleBallVelocity(socket: Socket): void {
    socket.on('ballVelocity', (newVelocity: { x: number; y: number }) => {
      socket.broadcast.emit('ballVelocity', newVelocity);
    });
  }

  private storeClient(clientId: string, socket: Socket) {
    this.clients[clientId] = { socket, state: 'Connecting' };
  }

  private handleClientDisconnection(clientId: string) {
    this.clients[clientId].socket.on('disconnect', () => {
      this.clients[clientId].state = 'Disconnecting';
      setTimeout(() => {
        delete this.clients[clientId];
        this.logClientsArray();
      }, this.delayDisconnect);
    });
  }

  private logClientsArray() {
    const clientsArray = this.getClientIdList().map((clientId) => ({
      clientId,
      state: this.clients[clientId].state,
    }));
    console.log('Clients Array:', clientsArray);
  }

  private getClientIdList(): string[] {
    return Object.keys(this.clients);
  }

  private handlePlayerMovement(socket: Socket) {
    socket.on('movement', (data: VectorData) => {
      socket.broadcast.emit('movement', data);
    });
  }

  private emitClientIdList(clientIdList: string[]) {
    this.serverSIO.emit('clientIdList', clientIdList);
  }
}