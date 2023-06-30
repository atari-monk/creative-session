import { Container } from 'inversify';
import { BallTypes, ballColors, ballParams } from '../data/appConfig';
import { IBall } from './IBall';
import { Ball } from './Ball';
import { IPosition } from '../model/IPosition';
import { PositionModel } from '../model/PositionModel';
import { ICircle } from '../model/ICircle';
import { CircleModel } from '../model/CircleModel';
import { IVelocity } from '../model/IVelocity';
import { Velocity } from '../model/Velocity';
import { BallRenderer } from './BallRenderer';
import { IBallRenderer } from './IBallRenderer';
import { IColorOptions } from '../data/configTypes';

export class BallFactory {
  constructor(private readonly container: Container) {}

  public registerDependencies() {
    this.RegisterModels();
    this.RegisterData();
    this.RegisterDrawer();
    this.container.bind<IBall>(Ball).to(Ball);
  }

  private RegisterModels() {
    this.container.bind<IPosition>(BallTypes.Position).toDynamicValue(() => {
      return new PositionModel(ballParams.position);
    });
    this.container.bind<IVelocity>(BallTypes.Velocity).toDynamicValue(() => {
      return new Velocity(ballParams.velocity);
    });
    this.container.bind<ICircle>(BallTypes.Circle).toDynamicValue(() => {
      return new CircleModel(ballParams.radius);
    });
  }

  private RegisterData() {
    this.container
      .bind<IColorOptions>(BallTypes.Colors)
      .toConstantValue(ballColors);
  }

  private RegisterDrawer() {
    this.container.bind<IBallRenderer>(BallTypes.Renderer).to(BallRenderer);
  }

  public resolve() {
    return this.container.resolve<IBall>(Ball);
  }
}
