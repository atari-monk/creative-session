import { Socket } from 'socket.io';
import { IVectorData } from 'atari-monk-game-api-lib';
import { SrvSctLogicUnit } from './lib/srv-sct-logic/SrvSctLogicUnit';

export class BallVelocity extends SrvSctLogicUnit {
  protected logicUnit(socket: Socket, data: IVectorData): void {
    const jsObj = {
      clientId: data.clientId,
      newVector: {
        x: data.newVector.x,
        y: data.newVector.y,
      },
    };
    socket.broadcast.emit('ballVelocity', jsObj);
  }
}
