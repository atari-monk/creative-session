import { Socket } from 'socket.io';
import { SrvSctLogicUnit } from './srv-sct-logic/SrvSctLogicUnit';

export class PlayerMovement extends SrvSctLogicUnit {
  protected logicUnit(
    socket: Socket,
    newPosition: { x: number; y: number }
  ): void {
    socket.broadcast.emit('movement', newPosition);
  }
}
