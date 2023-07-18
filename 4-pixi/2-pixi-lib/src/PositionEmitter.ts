import { EventEmitter } from 'eventemitter3';
import { IVectorData, IVector2d } from 'atari-monk-game-api-lib';

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
