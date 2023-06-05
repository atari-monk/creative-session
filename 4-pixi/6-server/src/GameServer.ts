import express, { Express } from 'express';
import cors from 'cors';
import http, { Server } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { VectorData } from './../../2-pixi-lib/dist/VectorData.js';

export class GameServer {
  private readonly app: Express;
  private readonly server: Server;
  private readonly ioOptions: any;
  private readonly io: SocketIOServer;
  private readonly PORT: string | number;
  private readonly clients: {
    [clientId: string]: { socket: Socket; state: string };
  };
  private readonly isLogging: boolean;
  private playerLimit: number;
  private readonly delayDisconnect: number;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.ioOptions = {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
      },
    };
    this.io = new SocketIOServer(this.server, this.ioOptions);
    this.PORT = process.env.PORT || 3000;
    this.clients = {};
    this.isLogging = true;
    this.playerLimit = 2;
    this.delayDisconnect = 1000;
  }

  public start() {
    this.configureMiddleware();
    this.configureSocketIO();
    this.listen();
  }

  public setPlayerLimit(limit: number) {
    if (typeof limit === 'number' && limit > 0) {
      this.playerLimit = limit;
      this.log(`Player limit set to ${limit}`);
    } else {
      this.log('Invalid player limit. Please provide a positive number.');
    }
  }

  private configureMiddleware() {
    this.app.use(cors());
  }

  private configureSocketIO() {
    this.io.on('connection', (socket) => {
      if (this.getClientCount() < this.playerLimit) {
        this.handleClientConnection(socket);
      } else {
        socket.disconnect();
        this.log('Disconnected player exceeding the limit');
      }
    });
  }

  protected handleClientConnection(socket: Socket) {
    const clientId = this.generateClientId(socket);
    this.storeClient(clientId, socket);
    this.handleClientDisconnection(clientId);
    this.handlePlayerMovement(socket);

    this.emitClientIdList(this.getClientIdList());
    this.logClientsArray();
  }

  private generateClientId(socket: Socket): string {
    return socket.id;
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

  private handlePlayerMovement(socket: Socket) {
    socket.on('movement', (data: VectorData) => {
      socket.broadcast.emit('movement', data);
    });
  }

  private getClientIdList(): string[] {
    return Object.keys(this.clients);
  }

  private emitClientIdList(clientIdList: string[]) {
    this.io.emit('clientIdList', clientIdList);
  }

  private getClientCount(): number {
    return Object.keys(this.clients).length;
  }

  private listen() {
    this.server.listen(this.PORT, () => {
      this.log(`Server is running on port ${this.PORT}`);
    });
  }

  private log(message: string) {
    if (this.isLogging) {
      console.log(message);
    }
  }

  private logClientsArray() {
    if (this.isLogging) {
      const clientsArray = this.getClientIdList().map((clientId) => ({
        clientId,
        state: this.clients[clientId].state,
      }));
      console.log('Clients Array:', clientsArray);
    }
  }
}
