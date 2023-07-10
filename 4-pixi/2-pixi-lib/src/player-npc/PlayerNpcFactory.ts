import { Container } from 'inversify';
import { PlayerNpcModel } from '../model/PlayerNpcModel';
import { playerNpcParams } from '../data/ballGameParams';
import { PlayerNpc } from './PlayerNpc';
import { IClientId } from '../model/interface/IClientId';
import { ICircleRenderer } from './ICircleRenderer';
import { CircleRenderer } from './CircleRenderer';
import { IDIFactory } from '../factory/IDIFactory';
import { IPlayerNpc } from './IPlayerNpc';
import { PlayerNpcTypes } from '../di-container/types';

export class PlayerNpcFactory implements IDIFactory {
  constructor(private readonly container: Container) {}

  public register() {
    this.container.bind<IClientId>(PlayerNpcTypes.Model).toDynamicValue(() => {
      return new PlayerNpcModel(playerNpcParams);
    });

    this.container
      .bind<ICircleRenderer>(PlayerNpcTypes.Renderer)
      .to(CircleRenderer);

    this.container.bind<IPlayerNpc>(PlayerNpcTypes.Player).to(PlayerNpc);
  }

  public create(): IPlayerNpc {
    return this.container.get<IPlayerNpc>(PlayerNpcTypes.Player);
  }
}
