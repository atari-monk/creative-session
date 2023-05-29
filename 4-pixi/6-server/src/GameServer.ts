import express, { Express } from 'express';
import cors from 'cors';
import http, { Server } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

class GameServer {
  private readonly app: Express;
  private readonly server: Server;
  private readonly ioOptions: any;
  private readonly io: SocketIOServer;
  private readonly PORT: string | number;
  private readonly clients: { [clientId: string]: { socket: Socket; state: string } };
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

  public start(): void {
    this.configureMiddleware();
    this.configureSocketIO();
    this.listen();
  }

  public setPlayerLimit(limit: number): void {
    if (typeof limit === 'number' && limit > 0) {
      this.playerLimit = limit;
      this.log(`Player limit set to ${limit}`);
    } else {
      this.log('Invalid player limit. Please provide a positive number.');
    }
  }

  private configureMiddleware(): void {
    this.app.use(cors());
  }

  private configureSocketIO(): void {
    this.io.on('connection', (socket) => {
      if (this.getClientCount() < this.playerLimit) {
        this.handleClientConnection(socket);
      } else {
        socket.disconnect();
        this.log('Disconnected player exceeding the limit');
      }
    });
  }

  protected handleClientConnection(socket: Socket): void {
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

  private storeClient(clientId: string, socket: Socket): void {
    this.clients[clientId] = { socket, state: 'Connecting' };
  }

  private handleClientDisconnection(clientId: string): void {
    this.clients[clientId].socket.on('disconnect', () => {
      this.clients[clientId].state = 'Disconnecting';
      setTimeout(() => {
        delete this.clients[clientId];
        this.logClientsArray();
      }, this.delayDisconnect);
    });
  }

  private handlePlayerMovement(socket: Socket): void {
    socket.on('movement', ({ clientId, newPosition }) => {
      socket.broadcast.emit('movement', { clientId, newPosition });
    });
  }

  private getClientIdList(): string[] {
    return Object.keys(this.clients);
  }

  private emitClientIdList(clientIdList: string[]): void {
    this.io.emit('clientIdList', clientIdList);
  }

  private getClientCount(): number {
    return Object.keys(this.clients).length;
  }

  private listen(): void {
    this.server.listen(this.PORT, () => {
      this.log(`Server is running on port ${this.PORT}`);
    });
  }

  private log(message: string): void {
    if (this.isLogging) {
      console.log(message);
    }
  }

  private logClientsArray(): void {
    if (this.isLogging) {
      const clientsArray = this.getClientIdList().map((clientId) => ({
        clientId,
        state: this.clients[clientId].state,
      }));
      console.log('Clients Array:', clientsArray);
    }
  }
}

export { GameServer };
