import { Socket } from 'socket.io';
import { IVectorData, SrvSctLogicUnit } from 'atari-monk-pixi-lib';

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
