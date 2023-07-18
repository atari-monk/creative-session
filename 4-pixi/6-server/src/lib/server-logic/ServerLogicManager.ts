import { Server } from 'socket.io';
import { LogicManagerGeneric } from './../logic/LogicManagerGeneric';
import { IServerLogicUnit } from 'atari-monk-game-api-lib';

export class ServerLogicManager extends LogicManagerGeneric<IServerLogicUnit> {
  public initializeServer(server: Server): void {
    this.logicUnits.forEach((unit) => {
      unit.initializeServer(server);
    });
  }
}
