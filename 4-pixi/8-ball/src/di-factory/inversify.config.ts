import { Container } from 'inversify';
import { configureContainer as clientLibConfigureContainer } from 'atari-monk-client';

export function configureContainer(container: Container) {
  const appFactory = clientLibConfigureContainer(container);
  appFactory.create();
}
