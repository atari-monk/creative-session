import { Container } from 'inversify';
import { keys, playerParams } from '../data/ballGameParams';
import { IKeys } from '../data/interfaces/IKeys';
import { Player } from './Player';
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
import { IDIFactory } from '../factory/IDIFactory';
import { IPlayerModel } from '../model/IPlayerModel';
import { PlayerModel } from '../model/PlayerModel';
import { IPlayer } from './IPlayer';
import { PlayerTypes, SharedTypes } from '../di-container/types';
import { EventEmitter } from '../service/EventEmitter';

export class PlayerFactory implements IDIFactory<IPlayer> {
  constructor(private readonly container: Container) {}

  public register() {
    this.RegisterModel();
    this.RegisterRenderer();
    this.RegisterKeyboard();
    this.RegisterUpdateables();
    this.container.bind<IPlayer>(Player).to(Player);
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
