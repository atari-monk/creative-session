import { Socket } from 'socket.io-client';
import { EventEmitterLogicUnit } from '../lib/emitter-logic/EventEmitterLogicUnit';
import { IVectorData } from 'atari-monk-game-api-lib';

export class PlayerEventEmitterLogicUnit extends EventEmitterLogicUnit {
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
