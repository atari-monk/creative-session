import { Environment } from './Environment';
import { SocketConfig } from './SocketConfig';

export class SocketConfigurator {
  private config: SocketConfig;
  private _uri: string;

  public get URI() {
    return this._uri;
  }

  constructor(config?: Partial<SocketConfig>) {
    this.config = this.getConfig(config);
    this._uri = this.getUri();
  }

  private getConfig(config?: Partial<SocketConfig>) {
    return {
      environment: Environment.Development,
      localUri: 'http://localhost:3001',
      prodUri: 'https://atari-monk-two-players.azurewebsites.net/',
      ...config,
    };
  }

  private getUri() {
    return this.config.environment === Environment.Development
      ? this.config.localUri
      : this.config.prodUri;
  }
}
