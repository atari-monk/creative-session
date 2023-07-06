import { Vector2d, ballOptions } from 'atari-monk-pixi-lib';
import { BallObject } from 'atari-monk-pixi-lib';
import EventEmitter from 'eventemitter3';

export class BallFactory {
  private _ball: BallObject;

  public get ball() {
    return this._ball;
  }

  constructor(eventEmitter: EventEmitter) {
    try {
      this._ball = new BallObject(eventEmitter, ballOptions);
      this._ball.position = new Vector2d(
        ballOptions.screenSize.width / 2,
        ballOptions.screenSize.height / 2
      );
    } catch (error) {
      console.error('Error creating ball:', error);
      throw error;
    }
  }
}
