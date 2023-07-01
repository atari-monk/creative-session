import { Container } from 'inversify';
import { PositionModel } from '../model/PositionModel';
import { CircleModel } from '../model/CircleModel';
import {
  NotPlayablePlayerTypes,
  rivalColors,
  rivalPlayer,
} from '../data/appConfig';
import { IPosition } from '../model/IPosition';
import { ICircle } from '../model/ICircle';
import { IColorOptions } from '../data/configTypes';
import { NotPlayablePlayer } from './NotPlayablePlayer';
import { IPlayable } from '../model/IPlayable';
import { Playable } from '../model/Playable';
import { IIdModel } from '../model/IIdModel';
import { IdModel } from '../model/IdModel';
import { INotPlayableDrawer } from './INotPlayableDrawer';
import { NotPlayableDrawer } from './NotPlayablePlayerDrawer';
import { IFactory } from './IFactory';
import { INotPlayablePlayer } from './INotPlayablePlayer';

export class NotPlayablePlayerFactory implements IFactory {
  constructor(private readonly container: Container) {}

  public register() {
    this.container
      .bind<IIdModel>(NotPlayablePlayerTypes.Id)
      .toDynamicValue(() => {
        return new IdModel('');
      });
    this.container
      .bind<IPlayable>(NotPlayablePlayerTypes.Playable)
      .toDynamicValue(() => {
        return new Playable(false);
      });
    this.container
      .bind<IPosition>(NotPlayablePlayerTypes.Position)
      .toDynamicValue(() => {
        return new PositionModel(rivalPlayer.rivalPosition);
      });
    this.container
      .bind<ICircle>(NotPlayablePlayerTypes.Circle)
      .toDynamicValue(() => {
        return new CircleModel(rivalPlayer.radius);
      });
    this.container
      .bind<IColorOptions>(NotPlayablePlayerTypes.Colors)
      .toConstantValue(rivalColors);
    this.container
      .bind<INotPlayableDrawer>(NotPlayablePlayerTypes.Drawer)
      .to(NotPlayableDrawer);
    this.container
      .bind<INotPlayablePlayer>(NotPlayablePlayerTypes.Player)
      .to(NotPlayablePlayer);
  }

  public create() {
    return this.container.get<INotPlayablePlayer>(
      NotPlayablePlayerTypes.Player
    );
  }
}
