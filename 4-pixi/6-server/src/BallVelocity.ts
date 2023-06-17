import { Socket } from 'socket.io';
import { SrvSctLogicUnit } from './srv-sct-logic/SrvSctLogicUnit';

export class BallVelocity extends SrvSctLogicUnit {
  protected logicUnit(
    socket: Socket,
    newVelocity: { x: number; y: number }
  ): void {
    socket.broadcast.emit('ballVelocity', newVelocity);
  }
}
