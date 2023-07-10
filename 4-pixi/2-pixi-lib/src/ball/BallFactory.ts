import { Container } from 'inversify';
import { ballParams } from '../data/ballGameParams';
import { IBall } from './IBall';
import { Ball } from './Ball';
import { BallRenderer } from './BallRenderer';
import { IBallRenderer } from './IBallRenderer';
import { IDIFactory } from '../factory/IDIFactory';
import { IBallModel } from '../model/IBallModel';
import { BallModel } from '../model/BallModel';
import { BallTypes } from '../di-container/types';

export class BallFactory implements IDIFactory {
  constructor(private readonly container: Container) {}

  public register() {
    this.RegisterModels();
    this.RegisterDrawer();
    this.container.bind<IBall>(BallTypes.Ball).to(Ball);
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
