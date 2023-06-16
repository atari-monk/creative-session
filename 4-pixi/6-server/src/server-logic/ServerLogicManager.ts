import { Server } from 'socket.io';
import { LogicManagerGeneric } from 'atari-monk-pixi-lib';
import { IServerLogicUnit } from './IServerLogicUnit';

export class ServerLogicManager extends LogicManagerGeneric<IServerLogicUnit> {
  public initializeServer(server: Server): void {
    this.logicUnits.forEach((unit) => {
      unit.initializeServer(server);
    });
  }
}
