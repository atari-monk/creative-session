import { Socket } from 'socket.io-client';
import { ISocketLogic } from './ISocketLogic.js';

export abstract class SocketLogicBase implements ISocketLogic {
  protected readonly socket: Socket;
  protected readonly eventName: string;

  constructor(socket: Socket, eventName: string) {
    this.socket = socket;
    this.eventName = eventName;
  }

  public addSocketLogic(): void {
    this.socket.on(this.eventName, this.eventLogic.bind(this));
  }

  protected abstract eventLogic(...args: any[]): void;
}
