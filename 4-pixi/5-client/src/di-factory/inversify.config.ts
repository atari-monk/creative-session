import { Container } from 'inversify';
import {
  AppFactory,
  configureContainer as pixiLibConfigureContainer,
  configureContainerForTest as pixiLibConfigureContainerForTest,
} from 'atari-monk-pixi-lib';
import { TestClientFactory } from './client/TestClientFactory';
import { ClientFactoryBuilder } from './client/ClientFactoryBuilder';
import { TestClientFactoryBuilder } from './client/TestClientFactoryBuilder';

export function configureContainer(container: Container): AppFactory {
  const appFactory = pixiLibConfigureContainer(container);

  container
    .bind<ClientFactoryBuilder>(ClientFactoryBuilder)
    .toSelf()
    .inSingletonScope();
  const factory = container.resolve<ClientFactoryBuilder>(ClientFactoryBuilder);

  factory.register(container);
  factory.create(container);
  return appFactory;
}

export function configureContainerForTest(
  container: Container
): TestClientFactory {
  pixiLibConfigureContainerForTest(container);

  container
    .bind<TestClientFactoryBuilder>(TestClientFactoryBuilder)
    .toSelf()
    .inSingletonScope();
  const factory = container.resolve<TestClientFactoryBuilder>(
    TestClientFactoryBuilder
  );

  factory.register(container);
  return factory.create(container);
}
