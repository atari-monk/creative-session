import { EventEmitter } from 'eventemitter3';
import {
  ServiceFactory,
  RivalPlayerFactory,
  PlayerFactory,
  IPlayer,
  SharedTypes,
} from 'atari-monk-pixi-lib';
import { AppFactory } from './AppFactory';
import { Container } from 'inversify';

export class PlayersFactory {
  private _emitter: EventEmitter;
  private _player1: IPlayer;
  private _player2: IPlayer;

  public get emitter() {
    return this._emitter;
  }

  public get player1() {
    return this._player1;
  }

  public get player2() {
    return this._player2;
  }

  constructor(private readonly container: Container) {
    const serviceFactory = new ServiceFactory(container);
    const rivalPlayerFactory = new RivalPlayerFactory(container);
    const playerFactory = new PlayerFactory(container);
    serviceFactory.register();
    rivalPlayerFactory.register();
    playerFactory.register();
    this._emitter = container.get<EventEmitter>(SharedTypes.EventEmitter);
    this._player1 = playerFactory.create();
    this._player2 = rivalPlayerFactory.create();
  }

  public addPlayers(appFactory: AppFactory) {
    appFactory.appHelper.addGameObject(this._player1);
    appFactory.appHelper.addGameObject(this._player2);
  }
}
