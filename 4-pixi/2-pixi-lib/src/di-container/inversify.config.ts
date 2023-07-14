import { Container } from 'inversify';
import { AppFactory } from '../app/AppFactory';
import { ServiceFactory } from '../service/ServiceFactory';
import { PlayerFactory } from '../player/PlayerFactory';
import { PlayerNpcFactory } from '../player-npc/PlayerNpcFactory';
import { AppFactoryForTest } from '../app/AppFactoryForTest';
import { BallFactory } from '../ball/BallFactory';
import { ObjectManagerCreator } from '../gameObject/ObjectManagerCreator';

export function configureContainer(container: Container) {
  const appFactory = new AppFactory(container);
  appFactory.register();

  const serviceFactory = new ServiceFactory(container);
  serviceFactory.register();

  const playerFactory = new PlayerFactory(container);
  playerFactory.register();

  const playerNpcFactory = new PlayerNpcFactory(container);
  playerNpcFactory.register();

  const ballFactory = new BallFactory(container);
  ballFactory.register();

  container.resolve(ObjectManagerCreator).create();

  appFactory.create();
}

export function configureContainerForTest(container: Container) {
  const appFactory = new AppFactoryForTest(container);
  appFactory.register();

  const serviceFactory = new ServiceFactory(container);
  serviceFactory.register();

  const playerFactory = new PlayerFactory(container);
  playerFactory.register();

  const playerNpcFactory = new PlayerNpcFactory(container);
  playerNpcFactory.register();

  const ballFactory = new BallFactory(container);
  ballFactory.register();

  container.resolve(ObjectManagerCreator).create();
}
