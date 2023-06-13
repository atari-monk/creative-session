import { EventEmitterLogicUnit } from '../emitter-logic/EventEmitterLogicUnit';
import { VectorData } from '../../../2-pixi-lib/dist/VectorData';
import { Socket } from 'socket.io-client';

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