import { Express } from 'express';
import cors from 'cors';
import { Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { ClientConnectionHandler } from './ClientConnectionHandler.js';

export class GameServer {
  private readonly PORT: string | number;

  constructor(
    private readonly app: Express,
    private readonly server: Server,
    private readonly serverSIO: SocketIOServer,
    private readonly clientConnectionHandler: ClientConnectionHandler
  ) {
    this.app = app;
    this.server = server;
    this.serverSIO = serverSIO;
    this.clientConnectionHandler = clientConnectionHandler;
    this.PORT = process.env.PORT || 3000;
  }

  public start() {
    this.configureMiddleware();
    this.configureSocketIO();
    this.listen();
  }

  private configureMiddleware() {
    this.app.use(cors());
  }

  private configureSocketIO() {
    this.serverSIO.on('connection', (socket) => {
      this.clientConnectionHandler.handleClientConnection(socket);
    });
  }

  private listen() {
    this.server.listen(this.PORT, () => {
      console.log(`Server is running on port ${this.PORT}`);
    });
  }
}
