import { Socket } from 'socket.io-client';
import { ISocketLogicUnit } from './ISocketLogicUnit.js';

export abstract class SocketLogicUnit implements ISocketLogicUnit {
  get eventName(): string {
    return this._eventName;
  }

  constructor(private readonly _eventName: string) {
    this._eventName = _eventName;
  }

  public initializeSocket(socket: Socket): void {
    socket.on(this.eventName, this.logicUnit.bind(this));
  }

  protected abstract logicUnit(...args: any[]): void;
}
