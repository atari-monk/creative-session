import { Container, injectable } from 'inversify';
import { IDIFactory } from '../IDIFactory';
import { PlayerManagerCreator } from './PlayerManagerCreator';
import { IPlayerManager } from '../../IPlayerManager';
import { PlayerManager } from '../../PlayerManager';

@injectable()
export class PlayerLogicFactory implements IDIFactory<void> {
  public register(container: Container) {
    container.bind<IPlayerManager>(PlayerManager).toSelf().inSingletonScope();
  }

  public create(container: Container) {
    container.resolve(PlayerManagerCreator).create();
  }
}
