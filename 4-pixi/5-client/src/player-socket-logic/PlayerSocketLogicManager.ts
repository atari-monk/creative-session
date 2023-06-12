import { Socket } from 'socket.io-client';
import { SocketLogicManager } from '../socket-logic/SocketLogicManager';

export class PlayerSocketLogicManager extends SocketLogicManager {
  constructor(socket: Socket) {
    super(socket);
  }
}
