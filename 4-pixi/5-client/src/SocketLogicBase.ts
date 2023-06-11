import { Socket } from 'socket.io-client';
import { ISetSocketOnHandler } from './ISetSocketOnHandler.js';

export abstract class SocketLogicBase implements ISetSocketOnHandler {
  protected readonly socket: Socket;
  protected readonly eventName: string;

  constructor(socket: Socket, eventName: string) {
    this.socket = socket;
    this.eventName = eventName;
  }

  public setSocketOnHandler(): void {
    this.socket.on(this.eventName, this.eventLogic.bind(this));
  }

  protected abstract eventLogic(...args: any[]): void;
}
