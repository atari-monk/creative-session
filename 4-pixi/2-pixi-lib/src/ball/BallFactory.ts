import { Container } from 'inversify';
import {
  IBall,
  IBallModel,
  IBallRenderer,
  IDIFactory,
} from 'atari-monk-game-api-lib';
import { ballParams } from '../data/ballGameParams';
import { Ball } from './Ball';
import { BallRenderer } from './BallRenderer';
import { BallModel } from '../model/BallModel';
import { BallTypes } from '../di-container/types';

export class BallFactory implements IDIFactory<IBall> {
  constructor(private readonly container: Container) {}

  public register() {
    this.RegisterModels();
    this.RegisterDrawer();
    this.container.bind<IBall>(Ball).toSelf().inSingletonScope();
  }

  private RegisterModels() {
    this.container.bind<IBallModel>(BallTypes.Model).toDynamicValue(() => {
      return new BallModel(ballParams);
    });
  }

  private RegisterDrawer() {
    this.container.bind<IBallRenderer>(BallTypes.Renderer).to(BallRenderer);
  }

  public create() {
    return this.container.resolve<IBall>(Ball);
  }
}
