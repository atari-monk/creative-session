import { EventEmitter } from 'eventemitter3';
import {
  player1Options,
  player2Options,
  keys,
  IPlayerOptions,
  screenSize,
} from 'atari-monk-pixi-lib';
import {
  KeyboardInputV1,
  KeyboardInputHandler,
  PlayerObject,
  BasicRenderer,
  PositionEmitter,
  PlayerComputation,
} from 'atari-monk-pixi-lib';
import { AppFactory } from './AppFactory';

export class PlayersFactory {
  private _emitter!: EventEmitter;
  private _player1!: PlayerObject;
  private _player2!: PlayerObject;
  private positionEmitter!: PositionEmitter;
  private playerRenderer!: BasicRenderer;
  private keyboard!: KeyboardInputHandler;

  public get emitter() {
    return this._emitter;
  }

  public get player1() {
    return this._player1;
  }

  public get player2() {
    return this._player2;
  }

  public createPlayers(appFactory: AppFactory) {
    this._emitter = new EventEmitter();
    this.positionEmitter = new PositionEmitter(
      'position-update',
      this._emitter
    );
    this.playerRenderer = new BasicRenderer();
    this.keyboard = new KeyboardInputHandler(new KeyboardInputV1(), keys);
    this._player1 = this.createPlayer1();
    this._player2 = this.createPlayer2();
    appFactory.appHelper.addGameObject(this._player1);
    appFactory.appHelper.addGameObject(this._player2);
  }

  private createPlayer(playerOptions: IPlayerOptions, offsetX: number) {
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
    player.position = {
      x: screenSize.width / 2 + offsetX,
      y: screenSize.height / 2,
    };
    return player;
  }

  private createPlayer1() {
    return this.createPlayer(player1Options, -250);
  }

  private createPlayer2() {
    return this.createPlayer(player2Options, 250);
  }
}
