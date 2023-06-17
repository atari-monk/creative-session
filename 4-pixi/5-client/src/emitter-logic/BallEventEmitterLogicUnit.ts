import { VectorData } from 'atari-monk-pixi-lib';
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

  protected logicUnit(data: VectorData) {
    this.socket.emit(this.socketEventName, data.newVector);
  }
}
