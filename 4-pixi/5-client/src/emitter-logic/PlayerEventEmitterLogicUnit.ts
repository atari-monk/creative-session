import { Socket } from 'socket.io-client';
import { EventEmitterLogicUnit } from 'atari-monk-pixi-lib';
import { VectorData } from 'atari-monk-pixi-lib';

export class PlayerEventEmitterLogicUnit extends EventEmitterLogicUnit {
  constructor(
    eventName: string,
    private readonly socketEventName: string,
    private readonly socket: Socket
  ) {
    super(eventName);
  }

  protected logicUnit(data: VectorData) {
    this.socket.emit(this.socketEventName, data);
  }
}
