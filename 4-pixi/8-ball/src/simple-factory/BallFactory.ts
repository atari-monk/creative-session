import { BallModel, BallRenderer, BasicRenderer, IBall } from 'atari-monk-pixi-lib';
import { Ball } from 'atari-monk-pixi-lib/ball/Ball';
import { ballParams } from 'atari-monk-pixi-lib/data/appConfig';
import EventEmitter from 'eventemitter3';

export class BallFactory {
  private _ball: IBall;

  public get ball() {
    return this._ball;
  }

  constructor(eventEmitter: EventEmitter) {
    try {
      this._ball = new Ball(
        new BallModel(ballParams),
        new BallRenderer(new BasicRenderer()),
        eventEmitter
      );
    } catch (error) {
      console.error('Error creating ball:', error);
      throw error;
    }
  }
}
