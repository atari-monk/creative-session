import { Container } from 'inversify';
import {
  IClientId,
  ICircleRenderer,
  IDIFactory,
  IPlayerNpc,
} from 'atari-monk-game-api-lib';
import { PlayerNpcModel } from '../model/PlayerNpcModel';
import { playerNpcParams } from '../data/ballGameParams';
import { PlayerNpc } from './PlayerNpc';
import { CircleRenderer } from './CircleRenderer';
import { PlayerNpcTypes } from '../di-container/types';

export class PlayerNpcFactory implements IDIFactory<IPlayerNpc> {
  constructor(private readonly container: Container) {}

  public register() {
    this.container.bind<IClientId>(PlayerNpcTypes.Model).toDynamicValue(() => {
      return new PlayerNpcModel(playerNpcParams);
    });

    this.container
      .bind<ICircleRenderer>(PlayerNpcTypes.Renderer)
      .to(CircleRenderer);

    this.container.bind<IPlayerNpc>(PlayerNpc).toSelf().inSingletonScope();
  }

  public create(): IPlayerNpc {
    return this.container.resolve<IPlayerNpc>(PlayerNpc);
  }
}
