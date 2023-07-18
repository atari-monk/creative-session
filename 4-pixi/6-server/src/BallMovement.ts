import { Socket } from 'socket.io';
import { IVectorData } from 'atari-monk-game-api-lib';
import { SrvSctLogicUnit } from './lib/srv-sct-logic/SrvSctLogicUnit';

export class BallMovement extends SrvSctLogicUnit {
  protected logicUnit(socket: Socket, data: IVectorData): void {
    const jsObj = {
      clientId: data.clientId,
      newVector: {
        x: data.newVector.x,
        y: data.newVector.y,
      },
    };
    socket.broadcast.emit('ballMovement', jsObj);
  }
}
