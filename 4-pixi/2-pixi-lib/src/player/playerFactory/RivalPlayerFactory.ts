import { Container } from 'inversify';
import { PositionModel } from '../../model/PositionModel';
import { CircleModel } from '../../model/CircleModel';
import {
  RivalPlayerTypes,
  rivalColors,
  rivalPlayer,
} from './../../data/appConfig';
import { IPosition } from '../../model/IPosition';
import { ICircle } from '../../model/ICircle';
import { IColorOptions } from '../../data/configTypes';
import { RivalPlayer } from '../RivalPlayer';
import { IPlayable } from '../../model/IPlayable';
import { Playable } from '../../model/Playable';
import { IIdModel } from '../../model/IIdModel';
import { IdModel } from '../../model/IdModel';

export class RivalPlayerFactory {
  constructor(public readonly container: Container) {}

  public registerDependencies() {
    this.container
      .bind<IIdModel>(RivalPlayerTypes.rivalId)
      .toDynamicValue(() => {
        return new IdModel('');
      });
    this.container
      .bind<IPlayable>(RivalPlayerTypes.rivalPlayable)
      .toDynamicValue(() => {
        return new Playable(false);
      });
    this.container
      .bind<IPosition>(RivalPlayerTypes.rivalPosition)
      .toDynamicValue(() => {
        return new PositionModel(rivalPlayer.rivalPosition);
      });
    this.container
      .bind<ICircle>(RivalPlayerTypes.rivalCircle)
      .toDynamicValue(() => {
        return new CircleModel(rivalPlayer.radius);
      });
    this.container
      .bind<IColorOptions>(RivalPlayerTypes.rivalColors)
      .toConstantValue(rivalColors);
  }

  public resolve() {
    return this.container.resolve<RivalPlayer>(RivalPlayer);
  }
}
