import { Socket } from 'socket.io-client';

export interface ISocketLogicUnit {
  initializeSocket(socket: Socket): void;
}
