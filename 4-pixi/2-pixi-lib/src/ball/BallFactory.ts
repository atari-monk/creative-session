import { Container } from 'inversify';
import { BallTypes, ballColors, ballParams } from '../data/appConfig';
import { IBall } from './IBall';
import { Ball } from './Ball';
import { IPosition } from '../model/IPosition';
import { PositionModel } from '../model/PositionModel';
import { IRadius } from '../model/IRadius';
import { CircleModel } from '../model/PlayerNpcModel';
import { IVelocity } from '../model/IVelocity';
import { Velocity } from '../model/Velocity';
import { BallRenderer } from './BallRenderer';
import { IBallRenderer } from './IBallRenderer';
import { IColorOptions } from '../data/configTypes';
import { IDIFactory } from '../factory/IDIFactory';

export class BallFactory implements IDIFactory {
  constructor(private readonly container: Container) {}

  public register() {
    this.RegisterModels();
    this.RegisterData();
    this.RegisterDrawer();
    this.container.bind<IBall>(BallTypes.Ball).to(Ball);
  }

  private RegisterModels() {
    this.container.bind<IVelocity>(BallTypes.Velocity).toDynamicValue(() => {
      return new Velocity(ballParams.velocity);
    });
    this.container.bind<IRadius>(BallTypes.Circle).toDynamicValue(() => {
      return new CircleModel(ballParams.radius, ballParams.position);
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

  public create() {
    return this.container.get<IBall>(BallTypes.Ball);
  }
}
