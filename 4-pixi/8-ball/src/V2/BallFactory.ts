import { AppFactory } from './AppFactory';
import { IBallFactory } from './IBallFactory';
import { IBall, BallFactory as DIBallFactory } from 'atari-monk-pixi-lib';
import { Container } from 'inversify';

export class BallFactory implements IBallFactory {
  private _ball: IBall;

  public get ball() {
    return this._ball;
  }

  constructor(container: Container, appFactory: AppFactory) {
    try {
      const ballFactory = new DIBallFactory(container);
      ballFactory.register();
      this._ball = ballFactory.create();
      appFactory.appHelper.addGameObject(this._ball);
    } catch (error) {
      console.error('Error creating ball:', error);
      throw error;
    }
  }
}
