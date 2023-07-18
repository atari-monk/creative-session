import { Socket } from 'socket.io';
import { ISrvSctLogicUnit } from 'atari-monk-game-api-lib';

export abstract class SrvSctLogicUnit implements ISrvSctLogicUnit {
  constructor(private readonly eventName: string) {}

  public initializeSocket(socket: Socket) {
    socket.on(this.eventName, (...args: any[]) =>
      this.logicUnit(socket, ...args)
    );
  }

  protected abstract logicUnit(socket: Socket, ...args: any[]): void;
}
