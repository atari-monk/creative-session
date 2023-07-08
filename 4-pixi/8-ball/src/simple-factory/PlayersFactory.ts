import {
  BasicRenderer,
  DirectionFromKeyboard,
  IPlayer,
  IPlayerNpc,
  KeyboardInputV1,
  Player,
  PlayerKeyboardMovement,
  PlayerModel,
  PlayerMoveEmitter,
  PlayerNpc,
  PlayerNpcModel,
  PlayerRenderer,
  PositionEmitter,
  keys,
  playerParams,
} from 'atari-monk-pixi-lib';
import EventEmitter from 'eventemitter3';

export class PlayersFactory {
  private _emitter: EventEmitter;
  private _player1: IPlayer;
  private _player2: IPlayerNpc;
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
    this._player1 = this.createPlayer();
    this._player2 = this.createPlayer();
  }

  private createPlayer() {
    return new Player(
      new PlayerModel(playerParams),
      new PlayerRenderer(new BasicRenderer()),
      [
        new PlayerKeyboardMovement(
          new DirectionFromKeyboard(new KeyboardInputV1(), keys)
        ),
        new PlayerMoveEmitter(
          new PositionEmitter('position-update', this._emitter)
        ),
      ]
    );
  }

  private createPlayerNpc() {
    return new PlayerNpc(
      new PlayerNpcModel(playerParams),
      new CircleRenderer(new BasicRenderer())
    );
  }
}
