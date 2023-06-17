import { Socket } from 'socket.io';
import { SrvSctLogicUnit } from 'atari-monk-pixi-lib';

export class BallVelocity extends SrvSctLogicUnit {
  protected logicUnit(
    socket: Socket,
    newVelocity: { x: number; y: number }
  ): void {
    socket.broadcast.emit('ballVelocity', newVelocity);
  }
}
