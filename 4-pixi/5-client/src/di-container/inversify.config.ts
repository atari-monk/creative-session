import { Container } from 'inversify';
import { SocketFactory } from '../di-factory/SocketFactory';

export function configureContainer(container: Container) {
  const appFactory = new SocketFactory(container);
  appFactory.register();
}

export function configureContainerForTest(container: Container) {
  const appFactory = new SocketFactory(container);
  appFactory.register();
}
