import { EventEmitter } from 'eventemitter3';
import {
  SharedPlayerFactory,
  RivalPlayerFactory,
  PlayerFactory,
  IPlayer,
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
    const sharedPlayerFactory = new SharedPlayerFactory(container);
    const rivalPlayerFactory = new RivalPlayerFactory(container);
    const playerFactory = new PlayerFactory(container);
    sharedPlayerFactory.registerDependencies();
    rivalPlayerFactory.registerDependencies();
    playerFactory.registerDependencies();
    this._emitter = container.resolve<EventEmitter>(EventEmitter);
    this._player1 = playerFactory.resolve();
    this._player2 = rivalPlayerFactory.resolve();
  }

  public addPlayers(appFactory: AppFactory) {
    appFactory.appHelper.addGameObject(this._player1);
    appFactory.appHelper.addGameObject(this._player2);
  }
}
