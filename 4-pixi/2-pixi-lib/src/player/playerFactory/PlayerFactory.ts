import { Container } from 'inversify';
import { CircleModel } from '../../model/CircleModel';
import { PlayerTypes, playerColors, playerParams } from '../../data/appConfig';
import { ICircle } from '../../model/ICircle';
import { IColorOptions } from '../../data/configTypes';
import { ISteerable } from '../../model/ISteerable';
import { SteerableModel } from '../../model/SteerableModel';
import { Player } from '../Player';
import { IPlayable } from '../../model/IPlayable';
import { Playable } from '../../model/Playable';
import { IIdModel } from '../../model/IIdModel';
import { IdModel } from '../../model/IdModel';

export class PlayerFactory {
  constructor(public readonly container: Container) {}

  public registerDependencies() {
     this.container
       .bind<IIdModel>(PlayerTypes.playerId)
       .toDynamicValue(() => {
         return new IdModel('');
       });
    this.container
      .bind<IPlayable>(PlayerTypes.playerPlayable)
      .toDynamicValue(() => {
        return new Playable(true);
      });
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
