import { Container } from 'inversify';
import { AppFactory } from '../app/AppFactory';

export function configureContainer(container: Container) {
  const appFactory = new AppFactory(container);
  appFactory.register();
}
