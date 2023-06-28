import { Vector2d, ballOptions } from 'atari-monk-pixi-lib';
import { BallObject, BallRendererV1 } from 'atari-monk-pixi-lib';
import { AppFactory } from './AppFactory';
import { PlayersFactory } from './PlayersFactory';

export class BallFactory {
  private _ball: BallObject;
  private _ballRenderer: BallRendererV1;

  public get ball() {
    return this._ball;
  }

  public get ballRenderer() {
    return this._ballRenderer;
  }

  constructor(appFactory: AppFactory, playersFactory: PlayersFactory) {
    try {
      this._ball = new BallObject(playersFactory.emitter, ballOptions);
      this._ball.position = new Vector2d(
        ballOptions.screenSize.width / 2,
        ballOptions.screenSize.height / 2
      );
      appFactory.appHelper.addGameObject(this._ball);
      this._ballRenderer = new BallRendererV1(
        appFactory.appHelper,
        appFactory.pixiApp
      );
    } catch (error) {
      console.error('Error creating ball:', error);
      throw error;
    }
  }
}
