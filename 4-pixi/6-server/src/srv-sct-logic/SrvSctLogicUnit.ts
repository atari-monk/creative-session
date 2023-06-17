import { Socket } from 'socket.io';
import { ISrvSctLogicUnit } from './ISrvSctLogicUnit.js';

export abstract class SrvSctLogicUnit implements ISrvSctLogicUnit {
  constructor(private readonly _eventName: string) {}

  public initializeSocket(socket: Socket) {
    socket.on(this._eventName, (...args: any[]) =>
      this.logicUnit(socket, ...args)
    );
  }

  protected abstract logicUnit(socket: Socket, ...args: any[]): void;
}
