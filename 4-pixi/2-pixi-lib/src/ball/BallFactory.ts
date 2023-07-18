import { Container } from 'inversify';
import {
  IBall,
  IBallModel,
  IBallRenderer,
  IDIFactory,
  BallTypes,
} from 'atari-monk-game-api-lib';
import { ballParams } from '../data/ballGameParams';
import { BallRenderer } from './BallRenderer';
import { BallModel } from '../model/BallModel';
import { Ball } from './Ball';

export class BallFactory implements IDIFactory<IBall> {
  constructor(private readonly container: Container) {}

  public register() {
    this.RegisterModels();
    this.RegisterDrawer();
    this.container.bind<IBall>(BallTypes.Ball).to(Ball).inSingletonScope();
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
    return this.container.get<IBall>(BallTypes.Ball);
  }
}
