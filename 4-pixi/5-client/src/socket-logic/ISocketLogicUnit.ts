import { Socket } from 'socket.io-client';

export interface ISocketLogicUnit {
  get eventName(): string;
  initializeSocket(socket: Socket): void;
}
