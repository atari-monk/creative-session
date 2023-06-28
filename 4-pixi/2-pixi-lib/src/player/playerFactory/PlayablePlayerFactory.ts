import { Container } from 'inversify';
import { CircleModel } from '../../model/CircleModel';
import {
  PlayablePlayerTypes,
  keys,
  playerColors,
  playerParams,
} from '../../data/appConfig';
import { ICircle } from '../../model/ICircle';
import { IColorOptions, IKeys } from '../../data/configTypes';
import { ISteerable } from '../../model/ISteerable';
import { SteerableModel } from '../../model/SteerableModel';
import { PlayablePlayer } from '../PlayablePlayer';
import { IPlayable } from '../../model/IPlayable';
import { Playable } from '../../model/Playable';
import { IIdModel } from '../../model/IIdModel';
import { IdModel } from '../../model/IdModel';
import { IPlayableDrawer } from '../IPlayableDrawer';
import { PlayablePlayerDrawer } from '../PlayablePlayerDrawer';
import { IDirectionFromKeyboard } from '../../IDirectionFromKeyboard';
import { DirectionFromKeyboard } from '../../DirectionFromKeyboard';
import { IUpdateablePlayer } from '../IUpdateablePlayer';
import { PlayerKeyboardMovement } from '../PlayerKeyboardMovement';
import { IKeyboardInput } from '../../IKeyboardInput';
import { KeyboardInputV1 } from '../../KeyboardInputV1';

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
    this.container
      .bind<IPlayableDrawer>(PlayablePlayerTypes.Drawer)
      .to(PlayablePlayerDrawer);
    this.container
      .bind<IKeyboardInput>(PlayablePlayerTypes.KeyboardInput)
      .to(KeyboardInputV1);
    this.container.bind<IKeys>(PlayablePlayerTypes.Keys).toConstantValue(keys);
    this.container
      .bind<IDirectionFromKeyboard>(PlayablePlayerTypes.DirectionFromKeyboard)
      .to(DirectionFromKeyboard);
    this.container
      .bind<IUpdateablePlayer>(PlayablePlayerTypes.KeyboardMovement)
      .to(PlayerKeyboardMovement);
  }

  public resolve() {
    return this.container.resolve<PlayablePlayer>(PlayablePlayer);
  }
}
