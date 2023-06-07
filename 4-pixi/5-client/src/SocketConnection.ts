import { Socket, connect } from 'socket.io-client';

export class SocketConnection {
  private _socket: Socket;

  public get socket() {
    return this._socket;
  }

  constructor(socket: Socket) {
    this._socket = socket;
    this.setupErrorHandling();
  }

  private setupErrorHandling() {
    this._socket.on('connect_error', (error: Error) => {
      console.error('Socket connection error:', error);
    });

    this._socket.on('connect_timeout', (timeout: number) => {
      console.error('Socket connection timeout:', timeout);
    });

    this._socket.on('error', (error: Error) => {
      console.error('Socket error:', error);
    });
  }
}
