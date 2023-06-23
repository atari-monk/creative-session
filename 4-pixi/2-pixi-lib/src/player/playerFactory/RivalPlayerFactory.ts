import { Container, interfaces } from 'inversify';
import { PositionModel } from '../../model/PositionModel';
import { CircleModel } from '../../model/CircleModel';
import {
  RivalPlayerTypes,
  rivalColors,
  rivalPlayer,
} from './../../data/appConfig';
import { IPosition } from '../../model/IPosition';
import { ICircle } from '../../model/ICircle';
import { IBasicRenderer } from '../../IBasicRenderer';
import { BasicRenderer } from '../../BasicRenderer';
import { IColorOptions } from '../../data/configTypes';
import { RivalPlayer } from '../RivalPlayer';

export class RivalPlayerFactory {
  constructor(public readonly container: Container) {}

  public registerDependencies() {
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
      .bind<IBasicRenderer>(RivalPlayerTypes.BasicRenderer)
      .to(BasicRenderer);
    this.container
      .bind<IColorOptions>(RivalPlayerTypes.rivalColors)
      .toConstantValue(rivalColors);
  }

  public resolveRivalPlayer() {
    return this.container.resolve<RivalPlayer>(RivalPlayer);
  }
}
