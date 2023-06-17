import { Socket } from 'socket.io';
import { SrvSctLogicUnit } from './srv-sct-logic/SrvSctLogicUnit';

// private handleBallMovement(socket: Socket): void {
//     socket.on('ballMovement', (newPosition: { x: number; y: number }) => {
//       socket.broadcast.emit('ballMovement', newPosition);
//     });
//  }

export class BallMovement extends SrvSctLogicUnit {
  protected logicUnit(
    socket: Socket,
    newPosition: { x: number; y: number }
  ): void {
    console.log('before broadcast');
    socket.broadcast.emit('ballMovement', newPosition);
    console.log('after broadcast');
  }
}
