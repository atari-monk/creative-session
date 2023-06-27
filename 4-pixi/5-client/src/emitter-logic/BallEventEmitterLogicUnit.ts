import { IVectorData } from 'atari-monk-pixi-lib';
import { EventEmitterLogicUnit } from 'atari-monk-pixi-lib';

import { Socket } from 'socket.io-client';

export class BallEventEmitterLogicUnit extends EventEmitterLogicUnit {
  constructor(
    eventName: string,
    private readonly socketEventName: string,
    private readonly socket: Socket
  ) {
    super(eventName);
  }

  protected logicUnit(data: IVectorData) {
    const jsObj = {
      clientId: data.clientId,
      newVector: {
        x: data.newVector.x,
        y: data.newVector.y,
      },
    };
    this.socket.emit(this.socketEventName, jsObj);
  }
}
