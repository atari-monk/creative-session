import { Socket } from 'socket.io-client';
import { EventEmitter } from 'eventemitter3';
import { VectorData } from '../../2-pixi-lib/dist/VectorData.js';

export class PlayerEmitter {
  private readonly positionEventName = 'position-update';

  constructor(
    private readonly emitter: EventEmitter,
    private readonly socket: Socket
  ) {
    this.emitter.on(this.positionEventName, (data: VectorData) => {
      this.socket.emit('movement', data);
    });
  }
}
