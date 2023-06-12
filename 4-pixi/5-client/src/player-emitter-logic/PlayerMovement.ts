import EventEmitter from 'eventemitter3';
import { EmitterLogicBase } from '../emitter-logic/EmitterLogicBase';
import { VectorData } from '../../../2-pixi-lib/dist/VectorData';
import { Socket } from 'socket.io-client';

export class PlayerMovement extends EmitterLogicBase {
  constructor(
    emitter: EventEmitter,
    private readonly socket: Socket,
    private readonly socketEventName: string
  ) {
    super(emitter, 'position-update');
    this.socket = socket;
    this.socketEventName = socketEventName;
  }

  protected eventLogic(data: VectorData) {
    this.socket.emit(this.socketEventName, data);
  }
}
