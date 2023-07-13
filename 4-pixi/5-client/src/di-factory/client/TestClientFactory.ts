import { Container, inject, injectable } from 'inversify';
import { Socket } from 'socket.io-client';
import { SocketLogicManager } from 'atari-monk-pixi-lib';
import { SocketLogicFactory } from '../socket-logic/SocketLogicFactory';
import { IDIFactory } from '../IDIFactory';
import { ClosedSocketFactory } from '../socket/ClosedSocketFactory';
import { PlayerLogicFactory } from '../player-logic/PlayerLogicFactory';
import { IPlayerLogic } from '../player-logic/IPlayerLogic';

@injectable()
export class TestClientFactory implements IDIFactory<void> {
  private _socket!: Socket;
  private _socketLogicManager!: SocketLogicManager;
  private _playerLogic!: IPlayerLogic;

  public get socket() {
    return this._socket;
  }

  public get socketLogicManager() {
    return this._socketLogicManager;
  }

  public get playerLogic() {
    return this._playerLogic;
  }

  constructor(
    @inject(ClosedSocketFactory)
    private readonly socketFactory: ClosedSocketFactory,
    @inject(SocketLogicFactory)
    private readonly socketLogicFactory: SocketLogicFactory,
    @inject(PlayerLogicFactory)
    private readonly playerLogicFactory: PlayerLogicFactory
  ) {}

  register(container: Container) {
    this.socketFactory.register(container);
    this.socketLogicFactory.register(container);
    this.playerLogicFactory.register(container);
  }

  create(container: Container) {
    this._socket = this.socketFactory.create(container);
    this._socketLogicManager = this.socketLogicFactory.create(container);
    this._playerLogic = this.playerLogicFactory.create(container);
  }
}
