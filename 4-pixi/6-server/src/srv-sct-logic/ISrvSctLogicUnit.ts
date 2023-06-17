import { Socket } from 'socket.io';

export interface ISrvSctLogicUnit {
  initializeSocket(socet: Socket): void;
}
