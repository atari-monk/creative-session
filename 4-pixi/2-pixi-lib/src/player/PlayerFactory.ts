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
} from 'atari-monk-game-api-lib';
import { keys, playerParams } from '../data/ballGameParams';
import { Player } from './Player';
import { PlayerRenderer } from './PlayerRenderer';
import { DirectionFromKeyboard } from '../keyboard/DirectionFromKeyboard';
import { PlayerKeyboardMovement } from './PlayerKeyboardMovement';
import { KeyboardInputV1 } from '../keyboard/KeyboardInputV1';
import { PlayerMoveEmitter } from './PlayerMoveEmitter';
import { PositionEmitter } from '../PositionEmitter';
import { PlayerModel } from '../model/PlayerModel';
import { PlayerTypes } from '../di-container/types';
import { EventEmitter } from '../service/EventEmitter';

export class PlayerFactory implements IDIFactory<IPlayer> {
  constructor(private readonly container: Container) {}

  public register() {
    this.RegisterModel();
    this.RegisterRenderer();
    this.RegisterKeyboard();
    this.RegisterUpdateables();
    this.container.bind<IPlayer>(Player).toSelf().inSingletonScope();
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
          this.container.resolve<EventEmitter>(EventEmitter)
        );
      });
    this.container
      .bind<IPlayerUpdater>(PlayerTypes.IPlayerUpdater)
      .to(PlayerMoveEmitter)
      .inSingletonScope();
  }

  public create(): IPlayer {
    return this.container.resolve<IPlayer>(Player);
  }
}
