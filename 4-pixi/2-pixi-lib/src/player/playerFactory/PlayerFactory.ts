import { Container } from 'inversify';
import { CircleModel } from '../../model/CircleModel';
import {
  PlayerTypes,
  playerColors,
  playerParams,
} from '../../data/appConfig';
import { ICircle } from '../../model/ICircle';
import { IColorOptions } from '../../data/configTypes';
import { ISteerable } from '../../model/ISteerable';
import { SteerableModel } from '../../model/SteerableModel';
import { Player } from '../Player';

export class PlayerFactory {
  constructor(public readonly container: Container) {}

  public registerDependencies() {
    this.container
      .bind<ISteerable>(PlayerTypes.playerSteering)
      .toDynamicValue(() => {
        return new SteerableModel(
          playerParams.position,
          playerParams.direction,
          playerParams.speed
        );
      });
    this.container
      .bind<ICircle>(PlayerTypes.playerCircle)
      .toDynamicValue(() => {
        return new CircleModel(playerParams.radius);
      });
    this.container
      .bind<IColorOptions>(PlayerTypes.playerColors)
      .toConstantValue(playerColors);
  }

  public resolve() {
    return this.container.resolve<Player>(Player);
  }
}
