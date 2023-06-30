import { AppFactory } from './AppFactory';
import { IBallFactory } from './IBallFactory';
import { PlayersFactory } from './PlayersFactory';
import {
  IBall,
  IBallRenderer,
  BallFactory as BallFactoryDI,
  BallRenderer,
} from 'atari-monk-pixi-lib';
import { Container } from 'inversify';

export class BallFactoryV2 implements IBallFactory {
  private _ball: IBall;
  private _ballRenderer: IBallRenderer;

  public get ball() {
    return this._ball;
  }

  public get ballRenderer() {
    return this._ballRenderer;
  }

  constructor(
    private readonly container: Container,
    appFactory: AppFactory,
    playersFactory: PlayersFactory
  ) {
    try {
      const ballFactory = new BallFactoryDI(container);
      ballFactory.registerDependencies();
      this._ball = ballFactory.resolve();
      appFactory.appHelper.addGameObject(this._ball);
      this._ballRenderer = this.container.resolve<IBallRenderer>(BallRenderer);
    } catch (error) {
      console.error('Error creating ball:', error);
      throw error;
    }
  }
}
