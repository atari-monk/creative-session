import { Server } from 'socket.io';
import { IServerLogicUnit } from 'atari-monk-game-api-lib';

export abstract class ServerLogicUnit implements IServerLogicUnit {
  constructor(private readonly eventName: string) {}

  public initializeServer(server: Server) {
    server.on(this.eventName, this.logicUnit.bind(this));
  }

  protected abstract logicUnit(...args: any[]): void;
}
