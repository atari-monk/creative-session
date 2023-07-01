import { Vector2d, ballOptions } from 'atari-monk-pixi-lib';
import { BallObject } from 'atari-monk-pixi-lib';
import { AppFactory } from './AppFactory';
import { PlayersFactory } from './PlayersFactory';

export class BallFactory {
  private _ball: BallObject;

  public get ball() {
    return this._ball;
  }

  constructor(appFactory: AppFactory, playersFactory: PlayersFactory) {
    try {
      this._ball = new BallObject(playersFactory.emitter, ballOptions);
      this._ball.position = new Vector2d(
        ballOptions.screenSize.width / 2,
        ballOptions.screenSize.height / 2
      );
      appFactory.appHelper.addGameObject(this._ball);
    } catch (error) {
      console.error('Error creating ball:', error);
      throw error;
    }
  }
}
