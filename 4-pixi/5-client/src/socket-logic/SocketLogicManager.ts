import { Socket } from 'socket.io-client';
import { LogicManagerGeneric } from '../logic/LogicManagerGeneric.js';
import { ISocketLogicUnit } from './ISocketLogicUnit.js';

export class SocketLogicManager extends LogicManagerGeneric<ISocketLogicUnit> {
  public initializeSocket(socket: Socket): void {
    this.logicUnits.forEach((unit) => {
      unit.initializeSocket(socket);
    });
  }
}
