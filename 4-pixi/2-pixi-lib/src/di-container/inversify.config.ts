import { Container } from 'inversify';
import { AppFactory } from '../app/AppFactory';
import { ServiceFactory } from '../service/ServiceFactory';
import { PlayerFactory } from '../player/PlayerFactory';
import { PlayerNpcFactory } from '../player-npc/PlayerNpcFactory';

export const container = new Container();

export function configureContainer() {
  const appFactory = new AppFactory(container);
  appFactory.register();

  const serviceFactory = new ServiceFactory(container);
  serviceFactory.register();

  const playerFactory = new PlayerFactory(container);
  playerFactory.register();

  const playerNpcFactory = new PlayerNpcFactory(container);
  playerNpcFactory.register();
}
