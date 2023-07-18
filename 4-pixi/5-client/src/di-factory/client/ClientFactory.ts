import { Container, inject, injectable } from 'inversify';
import { Socket } from 'socket.io-client';
import { SocketLogicFactory } from '../socket-logic/SocketLogicFactory';
import { IDIFactory } from '../IDIFactory';
import { OpenSocketFactory } from '../socket/OpenSocketFactory';
import { IBallLogic } from '../ball-logic/IBallLogic';
import { IPlayerLogic } from '../player-logic/IPlayerLogic';
import { PlayerLogicFactory } from '../player-logic/PlayerLogicFactory';
import { BallLogicFactory } from '../ball-logic/BallLogicFactory';
import { SocketLogicManager } from '../../lib/socket-logic/SocketLogicManager';

@injectable()
export class ClientFactory implements IDIFactory<void> {
  private _socket!: Socket;
  private _socketLogicManager!: SocketLogicManager;
  private _playerLogic!: IPlayerLogic;
  private _ballLogic!: IBallLogic;

  public get socket() {
    return this._socket;
  }

  public get socketLogicManager() {
    return this._socketLogicManager;
  }

  public get playerLogic() {
    return this._playerLogic;
  }

  public get ballLogic() {
    return this._ballLogic;
  }

  constructor(
    @inject(OpenSocketFactory)
    private readonly socketFactory: OpenSocketFactory,
    @inject(SocketLogicFactory)
    private readonly socketLogicFactory: SocketLogicFactory,
    @inject(PlayerLogicFactory)
    private readonly playerLogicFactory: PlayerLogicFactory,
    @inject(BallLogicFactory)
    private readonly ballLogicFactory: BallLogicFactory
  ) {}

  register(container: Container) {
    this.socketFactory.register(container);
    this.socketLogicFactory.register(container);
    this.playerLogicFactory.register(container);
    this.ballLogicFactory.register(container);
  }

  create(container: Container) {
    this._socket = this.socketFactory.create(container);
    this._socketLogicManager = this.socketLogicFactory.create(container);
    this._playerLogic = this.playerLogicFactory.create(container);
    this._ballLogic = this.ballLogicFactory.create(container);
  }
}
