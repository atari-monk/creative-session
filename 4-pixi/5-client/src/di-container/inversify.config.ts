import { Container } from 'inversify';
import { ClientFactory } from '../di-factory/ClientFactory';

export function configureContainer(container: Container) {
  const appFactory = new ClientFactory(container);
  appFactory.register();
}

export function configureContainerForTest(container: Container) {
  const appFactory = new ClientFactory(container);
  appFactory.register();
}
