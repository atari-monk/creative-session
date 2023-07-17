import { Container } from 'inversify';
import {
  ContainerTools,
  Player,
  configureContainer as pixiLibConfigureContainer,
} from 'atari-monk-pixi-lib';
import { configureContainer as clientLibConfigureContainer } from 'atari-monk-client';

export function configureContainer(container: Container) {
  const tool = new ContainerTools(container);
  const appFactory = pixiLibConfigureContainer(container);
  console.log('Player bound: ', tool.isDependencyBound(Player));
  console.log('Player scope: ', tool.getDependencyScope(Player));
  clientLibConfigureContainer(container);
  appFactory.create();
}
