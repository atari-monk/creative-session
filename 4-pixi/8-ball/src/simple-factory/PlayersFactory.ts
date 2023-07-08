import { EventEmitter } from 'eventemitter3';
import {
  player1Options,
  player2Options,
  keys,
  IPlayerOptions,
  screenSize,
  Vector2d,
  IPlayer,
  IPlayerNpc,
} from 'atari-monk-pixi-lib';
import {
  KeyboardInputV1,
  DirectionFromKeyboard,
  BasicRenderer,
  PositionEmitter,
} from 'atari-monk-pixi-lib';

export class PlayersFactory {
  private _emitter: EventEmitter;
  private _player1: IPlayer;
  private _player2: IPlayerNpc;
  private keyboard: DirectionFromKeyboard;
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
    this.keyboard = new DirectionFromKeyboard(new KeyboardInputV1(), keys);
    this._player1 = this.createPlayer(player1Options, -250);
    this._player2 = this.createPlayer(player2Options, 250);
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
    player.position = new Vector2d(
      screenSize.width / 2 + offsetX,
      screenSize.height / 2
    );
    return player;
  }
}
