import { Socket } from 'socket.io-client';
import { LogicManagerGeneric } from '../logic/LogicManagerGeneric';
import { ISocketLogicUnit } from 'atari-monk-game-api-lib';
import { injectable } from 'inversify';

@injectable()
export class SocketLogicManager extends LogicManagerGeneric<ISocketLogicUnit> {
  public initializeSocket(socket: Socket): void {
    this.logicUnits.forEach((unit) => {
      unit.initializeSocket(socket);
    });
  }
}
