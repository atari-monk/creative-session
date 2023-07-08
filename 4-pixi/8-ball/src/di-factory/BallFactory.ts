import {
  IBall,
  BallFactory as DIBallFactory,
} from 'atari-monk-pixi-lib';
import { Container } from 'inversify';
import { IBallFactory } from './IBallFactory';

export class BallFactory implements IBallFactory {
  private _ball: IBall;

  public get ball() {
    return this._ball;
  }

  constructor(container: Container) {
    try {
      const ballFactory = new DIBallFactory(container);
      ballFactory.register();
      this._ball = ballFactory.create();
    } catch (error) {
      console.error('Error creating ball:', error);
      throw error;
    }
  }
}
