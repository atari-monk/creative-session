import { EventEmitter } from 'eventemitter3';
import { Container } from 'inversify';
import {
  ServiceFactory,
  PlayerFactory,
  IPlayer,
  SharedTypes,
  PlayerNpcFactory,
  IPlayerNpc,
} from 'atari-monk-pixi-lib';

export class PlayersFactory {
  private _emitter: EventEmitter;
  private _player1: IPlayer;
  private _player2: IPlayerNpc;

  public get emitter() {
    return this._emitter;
  }

  public get player1(): IPlayer {
    return this._player1;
  }

  public get player2(): IPlayerNpc {
    return this._player2;
  }

  constructor(container: Container) {
    const serviceFactory = new ServiceFactory(container);
    const playerFactory = new PlayerFactory(container);
    const playerNpcFactory = new PlayerNpcFactory(container);

    serviceFactory.register();
    playerFactory.register();
    playerNpcFactory.register();

    this._emitter = container.get<EventEmitter>(SharedTypes.EventEmitter);
    this._player1 = playerFactory.create();
    this._player2 = playerNpcFactory.create();
  }
}
