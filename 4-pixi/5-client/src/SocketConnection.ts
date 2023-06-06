import { Socket, connect } from 'socket.io-client';

export class SocketConnection {
  private _socket: Socket;

  constructor() {
    this._socket = this.setupSocketConnection();
  }

  protected setupSocketConnection(isInDevEnv = true): Socket {
    const socket = connect(
      isInDevEnv
        ? 'http://localhost:3000'
        : 'https://atari-monk-two-players.azurewebsites.net/'
    );
    return socket;
  }

  public get socket(): Socket {
    return this._socket;
  }
}
