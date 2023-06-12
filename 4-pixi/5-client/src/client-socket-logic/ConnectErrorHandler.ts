import { Socket } from 'socket.io-client';
import { SocketLogicBase } from '../socket-logic/SocketLogicBase.js';

export class ConnectErrorHandler extends SocketLogicBase {
  constructor(socket: Socket) {
    super(socket, 'connect_error');
  }

  protected eventLogic(error: Error) {
    console.error('Connection error:', error.message);
  }
}
