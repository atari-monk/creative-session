import { Container } from 'inversify';
import {
  ContainerTools,
  Player,
  configureContainer as pixiLibConfigureContainer,
} from 'atari-monk-pixi-lib';
import { configureContainer as clientLibConfigureContainer } from 'atari-monk-client';
import { SharedTypes } from 'atari-monk-game-api-lib';

export function configureContainer(container: Container) {
  const tool = new ContainerTools(container);
  const appFactory = pixiLibConfigureContainer(container);
  console.log('Player bound: ', tool.isDependencyBound(Player));
  console.log('Player scope: ', tool.getDependencyScope(Player));
  const ee = container.get(SharedTypes.EventEmitter);
  console.log(ee);
  clientLibConfigureContainer(container);
  appFactory.create();
}
