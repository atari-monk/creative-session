import { Socket } from 'socket.io-client';

export interface IGameClient {
  socket: Socket | undefined;
}
