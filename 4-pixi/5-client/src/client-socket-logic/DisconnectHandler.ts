import { Socket } from 'socket.io-client';
import { SocketLogicBase } from '../socket-logic/SocketLogicBase.js';

export class DisconnectHandler extends SocketLogicBase {
  constructor(socket: Socket) {
    super(socket, 'disconnect');
  }

  protected eventLogic() {
    console.log('Disconnected from server');
  }
}
