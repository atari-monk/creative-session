import { Socket } from 'socket.io';
import { LogicManagerGeneric } from './../logic/LogicManagerGeneric';
import { ISrvSctLogicUnit } from './ISrvSctLogicUnit';

export class SrvSctLogicManager extends LogicManagerGeneric<ISrvSctLogicUnit> {
  public initializeSocket(socket: Socket): void {
    this.logicUnits.forEach((unit) => {
      unit.initializeSocket(socket);
    });
  }
}
