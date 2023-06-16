import { Server } from 'socket.io';
import { IServerLogicUnit } from './IServerLogicUnit.js';

export abstract class ServerLogicUnit implements IServerLogicUnit {
  constructor(private readonly _eventName: string) {}

  public initializeServer(server: Server) {
    server.on(this._eventName, this.logicUnit.bind(this));
  }

  protected abstract logicUnit(...args: any[]): void;
}
