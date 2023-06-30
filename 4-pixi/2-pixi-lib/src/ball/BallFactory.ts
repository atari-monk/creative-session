import { Container } from 'inversify';
import { BallTypes, ballParams } from '../data/appConfig';
import { IBall } from './IBall';
import { Ball } from './Ball';
import { IPosition } from '../model/IPosition';
import { PositionModel } from '../model/PositionModel';
import { ICircle } from '../model/ICircle';
import { CircleModel } from '../model/CircleModel';

export class BallFactory {
  constructor(private readonly container: Container) {}

  public registerDependencies() {
    this.RegisterModels();
    this.container.bind<IBall>(Ball).to(Ball);
  }

  private RegisterModels() {
    this.container.bind<IPosition>(BallTypes.Position).toDynamicValue(() => {
      return new PositionModel(ballParams.position);
    });
    this.container.bind<ICircle>(BallTypes.Circle).toDynamicValue(() => {
      return new CircleModel(ballParams.radius);
    });
  }

  public resolve() {
    return this.container.resolve<IBall>(Ball);
  }
}
