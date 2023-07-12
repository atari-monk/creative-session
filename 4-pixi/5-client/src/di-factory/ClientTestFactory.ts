import { Container, inject, injectable } from 'inversify';
import { Socket } from 'socket.io-client';
import { SocketLogicManager } from 'atari-monk-pixi-lib';
import { SocketLogicFactory } from './SocketLogicFactory';
import { IDIFactory } from './IDIFactory';
import { ClosedSocketFactory } from './socketFactory/ClosedSocketFactory';

@injectable()
export class ClientTestFactory implements IDIFactory<void> {
  private _socket!: Socket;
  private _socketLogicManager!: SocketLogicManager;

  public get socket() {
    return this._socket;
  }

  public get socketLogicManager() {
    return this._socketLogicManager;
  }

  constructor(
    @inject(ClosedSocketFactory)
    private readonly socketFactory: ClosedSocketFactory,
    @inject(SocketLogicFactory)
    private readonly socketLogicFactory: SocketLogicFactory
  ) {}

  register(container: Container) {
    this.socketFactory.register(container);
    this.socketLogicFactory.register(container);
  }

  create(container: Container) {
    this._socket = this.socketFactory.create(container);
    this._socketLogicManager = this.socketLogicFactory.create(container);
  }
}
