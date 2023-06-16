import { Server } from 'socket.io';

export interface IServerLogicUnit {
  initializeServer(server: Server): void;
}
