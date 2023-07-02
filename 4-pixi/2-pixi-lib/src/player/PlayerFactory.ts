import { Container } from 'inversify';
import { CircleModel } from '../model/PlayerNpcModel';
import {
  PlayerTypes,
  SharedTypes,
  keys,
  playerColors,
  playerParams,
} from '../data/appConfig';
import { IRadius } from '../model/IRadius';
import { IColorOptions, IKeys } from '../data/configTypes';
import { ISteerable } from '../model/ISteerable';
import { SteerableModel } from '../model/SteerableModel';
import { Player } from './Player';
import { IPlayable } from '../model/IPlayable';
import { Playable } from '../model/Playable';
import { IIdModel } from '../model/IIdModel';
import { IdModel } from '../model/IdModel';
import { IPlayerRenderer } from './IPlayerRenderer';
import { PlayerRenderer } from './PlayerRenderer';
import { IDirectionFromKeyboard } from '../keyboard/IDirectionFromKeyboard';
import { DirectionFromKeyboard } from '../keyboard/DirectionFromKeyboard';
import { IPlayerUpdater } from './IPlayerUpdater';
import { PlayerKeyboardMovement } from './PlayerKeyboardMovement';
import { IKeyboardInput } from '../keyboard/IKeyboardInput';
import { KeyboardInputV1 } from '../keyboard/KeyboardInputV1';
import { PlayerMoveEmitter } from './PlayerMoveEmitter';
import { PositionEmitter } from '../PositionEmitter';
import EventEmitter from 'eventemitter3';
import { IPlayer } from '..';
import { IDIFactory } from '../factory/IDIFactory';

export class PlayerFactory implements IDIFactory {
  constructor(private readonly container: Container) {}

  public register() {
    this.RegisterModels();
    this.RegisterData();
    this.RegisterDrawer();
    this.RegisterKeyboard();
    this.RegisterUpdateables();
    this.container.bind<IPlayer>(PlayerTypes.Player).to(Player);
  }

  private RegisterModels() {
    this.container.bind<IIdModel>(PlayerTypes.Id).toDynamicValue(() => {
      return new IdModel('');
    });
    this.container.bind<IPlayable>(PlayerTypes.Playable).toDynamicValue(() => {
      return new Playable(true);
    });
    this.container
      .bind<ISteerable>(PlayerTypes.Steerable)
      .toDynamicValue(() => {
        return new SteerableModel(
          playerParams.position,
          playerParams.direction,
          playerParams.speed
        );
      });
    this.container.bind<IRadius>(PlayerTypes.Circle).toDynamicValue(() => {
      return new CircleModel(playerParams.radius);
    });
  }

  private RegisterData() {
    this.container
      .bind<IColorOptions>(PlayerTypes.Colors)
      .toConstantValue(playerColors);
  }

  private RegisterDrawer() {
    this.container
      .bind<IPlayerRenderer>(PlayerTypes.Renderer)
      .to(PlayerRenderer);
  }

  private RegisterKeyboard() {
    this.container
      .bind<IKeyboardInput>(PlayerTypes.KeyboardInput)
      .to(KeyboardInputV1);
    this.container.bind<IKeys>(PlayerTypes.Keys).toConstantValue(keys);
    this.container
      .bind<IDirectionFromKeyboard>(PlayerTypes.DirectionFromKeyboard)
      .to(DirectionFromKeyboard);
  }

  private RegisterUpdateables() {
    this.container
      .bind<IPlayerUpdater>(PlayerTypes.IPlayerUpdater)
      .to(PlayerKeyboardMovement)
      .inSingletonScope();
    this.RegisterPlayerMoveEmitter();
  }

  private RegisterPlayerMoveEmitter() {
    this.container
      .bind<PositionEmitter>(PlayerTypes.PositionEmitter)
      .toDynamicValue(() => {
        return new PositionEmitter(
          'position-update',
          this.container.get<EventEmitter>(SharedTypes.EventEmitter)
        );
      });
    this.container
      .bind<IPlayerUpdater>(PlayerTypes.IPlayerUpdater)
      .to(PlayerMoveEmitter)
      .inSingletonScope();
  }

  public create() {
    return this.container.get<Player>(PlayerTypes.Player);
  }
}
