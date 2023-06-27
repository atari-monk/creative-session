import { EventEmitter } from 'eventemitter3';
import { IVectorData } from './IVectorData';
import { IVector2d } from './model/IVector2d';

export class PositionEmitter {
  constructor(
    private readonly positionEventName: string,
    private readonly emitter: EventEmitter
  ) {}

  public emitPosition(clientId: string, newPosition: IVector2d) {
    const data: IVectorData = {
      clientId: clientId,
      newVector: newPosition,
    };
    this.emitter.emit(this.positionEventName, data);
  }
}
