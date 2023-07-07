import { Container } from 'inversify';
import { PlayerNpcModel } from '../model/PlayerNpcModel';
import { PlayerNpcTypes, playerNpcParams } from '../data/appConfig';
import { PlayerNpc } from './PlayerNpc';
import { IClientId } from '../model/interface/IClientId';
import { ICircleRenderer } from './ICircleRenderer';
import { CircleRenderer } from './CircleRenderer';
import { IDIFactory } from '../factory/IDIFactory';
import { IPlayerNpc } from './IPlayerNpc';

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
