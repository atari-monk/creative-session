import { Socket } from 'socket.io-client';
import { ISocketLogicUnit } from './ISocketLogicUnit.js';
import { injectable } from 'inversify';

@injectable()
export abstract class SocketLogicUnit implements ISocketLogicUnit {
  constructor(private readonly _eventName: string) {}

  public initializeSocket(socket: Socket) {
    socket.on(this._eventName, this.logicUnit.bind(this));
  }

  protected abstract logicUnit(...args: any[]): void;
}
