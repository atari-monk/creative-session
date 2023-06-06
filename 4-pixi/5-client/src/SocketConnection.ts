import { Socket, connect } from 'socket.io-client';
import { Environment } from './Environment';
import { SocketConfig } from './SocketConfig';

export class SocketConnection {
  private config: SocketConfig;
  private uri: string;
  private _socket: Socket;

  constructor(config?: Partial<SocketConfig>) {
    this.config = this.getConfig(config);
    this.uri = this.getUri();
    this._socket = this.setupSocketConnection();
  }

  private getConfig(config?: Partial<SocketConfig>) {
    return {
      environment: Environment.Development,
      localUri: 'http://localhost:3000',
      prodUri: 'https://atari-monk-two-players.azurewebsites.net/',
      ...config,
    };
  }

  private getUri() {
    return this.config.environment === Environment.Development
      ? this.config.localUri
      : this.config.prodUri;
  }

  protected setupSocketConnection() {
    const socket = connect(this.uri);
    return socket;
  }

  public get socket() {
    return this._socket;
  }
}
