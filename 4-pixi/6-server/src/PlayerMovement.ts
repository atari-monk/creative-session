import { Socket } from 'socket.io';
import { SrvSctLogicUnit } from './lib/srv-sct-logic/SrvSctLogicUnit';
import { IVectorData } from 'atari-monk-game-api-lib';

export class PlayerMovement extends SrvSctLogicUnit {
  protected logicUnit(socket: Socket, data: IVectorData): void {
    const jsObj = {
      clientId: data.clientId,
      newVector: {
        x: data.newVector.x,
        y: data.newVector.y,
      },
    };
    socket.broadcast.emit('movement', jsObj);
  }
}
