import { Container } from 'inversify';
import { CircleModel } from '../../model/CircleModel';
import {
  PlayablePlayerTypes,
  playerColors,
  playerParams,
} from '../../data/appConfig';
import { ICircle } from '../../model/ICircle';
import { IColorOptions } from '../../data/configTypes';
import { ISteerable } from '../../model/ISteerable';
import { SteerableModel } from '../../model/SteerableModel';
import { PlayablePlayer } from '../PlayablePlayer';
import { IPlayable } from '../../model/IPlayable';
import { Playable } from '../../model/Playable';
import { IIdModel } from '../../model/IIdModel';
import { IdModel } from '../../model/IdModel';

export class PlayablePlayerFactory {
  constructor(public readonly container: Container) {}

  public registerDependencies() {
    this.container.bind<IIdModel>(PlayablePlayerTypes.Id).toDynamicValue(() => {
      return new IdModel('');
    });
    this.container
      .bind<IPlayable>(PlayablePlayerTypes.Playable)
      .toDynamicValue(() => {
        return new Playable(true);
      });
    this.container
      .bind<ISteerable>(PlayablePlayerTypes.Steering)
      .toDynamicValue(() => {
        return new SteerableModel(
          playerParams.position,
          playerParams.direction,
          playerParams.speed
        );
      });
    this.container
      .bind<ICircle>(PlayablePlayerTypes.Circle)
      .toDynamicValue(() => {
        return new CircleModel(playerParams.radius);
      });
    this.container
      .bind<IColorOptions>(PlayablePlayerTypes.Colors)
      .toConstantValue(playerColors);
  }

  public resolve() {
    return this.container.resolve<PlayablePlayer>(PlayablePlayer);
  }
}
