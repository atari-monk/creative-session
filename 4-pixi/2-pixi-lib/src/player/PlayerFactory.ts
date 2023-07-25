import { Container } from 'inversify';
import {
  IPlayerRenderer,
  IDirectionFromKeyboard,
  IPlayerUpdater,
  IKeyboardInput,
  IDIFactory,
  IPlayerModel,
  IPlayer,
  IKeys,
  PlayerTypes,
  SharedTypes,
} from 'atari-monk-game-api-lib';
import { keys, playerParams } from '../data/ballGameParams';
import { PlayerRenderer } from './PlayerRenderer';
import { DirectionFromKeyboard } from '../keyboard/DirectionFromKeyboard';
import { PlayerKeyboardMovement } from './PlayerKeyboardMovement';
import { KeyboardInputV1 } from '../keyboard/KeyboardInputV1';
import { PlayerMoveEmitter } from './PlayerMoveEmitter';
import { PositionEmitter } from '../PositionEmitter';
import { PlayerModel } from './PlayerModel';
import { Player } from './Player';
import EventEmitter from 'eventemitter3';

export class PlayerFactory implements IDIFactory<IPlayer> {
  constructor(private readonly container: Container) {}

  public register() {
    this.RegisterModel();
    this.RegisterRenderer();
    this.RegisterKeyboard();
    this.RegisterUpdateables();
    this.container
      .bind<IPlayer>(PlayerTypes.Player)
      .to(Player)
      .inSingletonScope();
  }

  private RegisterModel() {
    this.container.bind<IPlayerModel>(PlayerTypes.Model).toDynamicValue(() => {
      return new PlayerModel(playerParams);
    });
  }

  private RegisterRenderer() {
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

  public create(): IPlayer {
    return this.container.get<IPlayer>(PlayerTypes.Player);
  }
}
