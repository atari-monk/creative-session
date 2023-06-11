import { Socket } from 'socket.io-client';
import { IPlayerManager } from './IPlayerManager.js';
import { ISetSocketOnHandler } from './ISetSocketOnHandler.js';

export class DisconnectHandler implements ISetSocketOnHandler {
  private readonly socket: Socket;
  private readonly eventName: string = 'disconnect';

  constructor(socket: Socket) {
    this.socket = socket;
  }

  public setSocketOnHandler() {
    this.socket.on(this.eventName, this.handleDisconnect.bind(this));
  }

  private handleDisconnect() {
    console.log('Disconnected from server');
  }
}
