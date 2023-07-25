import { Container } from 'inversify';
import {
  IClientId,
  ICircleRenderer,
  IDIFactory,
  IPlayerNpc,
  PlayerNpcTypes,
} from 'atari-monk-game-api-lib';
import { PlayerNpcModel } from './PlayerNpcModel';
import { playerNpcParams } from '../data/ballGameParams';
import { CircleRenderer } from './CircleRenderer';
import { PlayerNpc } from './PlayerNpc';

export class PlayerNpcFactory implements IDIFactory<IPlayerNpc> {
  constructor(private readonly container: Container) {}

  public register() {
    this.container.bind<IClientId>(PlayerNpcTypes.Model).toDynamicValue(() => {
      return new PlayerNpcModel(playerNpcParams);
    });

    this.container
      .bind<ICircleRenderer>(PlayerNpcTypes.Renderer)
      .to(CircleRenderer);

    this.container
      .bind<IPlayerNpc>(PlayerNpcTypes.Player)
      .to(PlayerNpc)
      .inSingletonScope();
  }

  public create(): IPlayerNpc {
    return this.container.get<IPlayerNpc>(PlayerNpcTypes.Player);
  }
}
