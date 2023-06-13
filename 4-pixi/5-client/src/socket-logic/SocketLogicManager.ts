import { Socket } from 'socket.io-client';
import { LogicManagerGeneric } from '../logic/LogicManagerGeneric.js';
import { ISocketLogicUnit } from './ISocketLogicUnit.js';

export class SocketLogicManager extends LogicManagerGeneric<ISocketLogicUnit> {
  private readonly socket: Socket;

  constructor(socket: Socket) {
    super();
    this.socket = socket;
  }

  public initializeSocket(): void {
    this.logicUnits.forEach((unit) => {
      unit.initializeSocket(this.socket);
    });
  }
}
