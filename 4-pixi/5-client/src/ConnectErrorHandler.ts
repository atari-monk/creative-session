import { Socket } from 'socket.io-client';
import { ISetSocketOnHandler } from './ISetSocketOnHandler.js';

export class ConnectErrorHandler implements ISetSocketOnHandler {
  private readonly socket: Socket;
  private readonly eventName: string = 'connect_error';

  constructor(socket: Socket) {
    this.socket = socket;
  }

  public setSocketOnHandler() {
    this.socket.on(this.eventName, this.handleConnectError.bind(this));
  }

  private handleConnectError(error: Error) {
    console.error('Connection error:', error.message);
  }
}
