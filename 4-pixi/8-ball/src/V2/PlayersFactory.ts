import { EventEmitter } from 'eventemitter3';
import {
  keys,
  SharedPlayerFactory,
  RivalPlayerFactory,
  playerParams,
} from 'atari-monk-pixi-lib';
import {
  KeyboardInputV1,
  KeyboardInputHandler,
  PlayerObject,
  BasicRenderer,
  PositionEmitter,
  PlayerComputation,
  RivalPlayer,
} from 'atari-monk-pixi-lib';
import { AppFactory } from './AppFactory';
import { Container } from 'inversify';
import { IPlayerOptionsV2 } from 'atari-monk-pixi-lib/data/configTypes';

export class PlayersFactory {
  private _emitter: EventEmitter;
  private _player1: PlayerObject;
  private _player2: RivalPlayer;
  private keyboard: KeyboardInputHandler;
  private positionEmitter: PositionEmitter;
  private playerRenderer: BasicRenderer;

  public get emitter() {
    return this._emitter;
  }

  public get player1() {
    return this._player1;
  }

  public get player2() {
    return this._player2;
  }

  constructor() {
    this._emitter = new EventEmitter();
    this.positionEmitter = new PositionEmitter(
      'position-update',
      this._emitter
    );
    this.playerRenderer = new BasicRenderer();
    this.keyboard = new KeyboardInputHandler(new KeyboardInputV1(), keys);
    this._player1 = this.createPlayer(playerParams, -250);

    const container = new Container();
    const sharedPlayerFactory = new SharedPlayerFactory(container);
    const rivalPlayerFactory = new RivalPlayerFactory(container);
    sharedPlayerFactory.registerDependencies();
    rivalPlayerFactory.registerDependencies();
    this._player2 = rivalPlayerFactory.resolve();
  }

  private createPlayer(playerOptions: IPlayerOptionsV2, offsetX: number) {
    const playerComputation = new PlayerComputation(
      this.keyboard,
      this.positionEmitter,
      playerOptions
    );
    const player = new PlayerObject(
      this.playerRenderer,
      playerComputation,
      playerOptions
    );
    player.position = playerOptions.position;
    return player;
  }

  public addPlayers(appFactory: AppFactory) {
    appFactory.appHelper.addGameObject(this._player1);
    appFactory.appHelper.addGameObject(this._player2);
  }
}
