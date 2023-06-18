import { EventEmitter } from 'eventemitter3';
import { VectorData } from './VectorData';

export class PositionEmitter {
  constructor(
    private readonly positionEventName: string,
    private readonly emitter: EventEmitter
  ) {}

  public emitPosition(
    clientId: string,
    newPosition: { x: number; y: number }
  ) {
    const data: VectorData = {
      clientId: clientId,
      newVector: newPosition,
    };
    this.emitter.emit(this.positionEventName, data);
  }
}
