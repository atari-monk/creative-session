import { Container } from 'inversify';
import { configureContainer as pixiLibConfigureContainer } from 'atari-monk-pixi-lib';
import { configureContainer as clientLibConfigureContainer } from 'atari-monk-client';

export function configureContainer(container: Container) {
  const appFactory = pixiLibConfigureContainer(container);
  clientLibConfigureContainer(container);
  appFactory.create();
}
