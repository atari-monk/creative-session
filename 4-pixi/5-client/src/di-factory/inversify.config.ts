import { Container } from 'inversify';
import { TestClientFactory } from './client/TestClientFactory';
import { ClientFactoryBuilder } from './client/ClientFactoryBuilder';
import { TestClientFactoryBuilder } from './client/TestClientFactoryBuilder';

export function configureContainer(container: Container) {
  container
    .bind<ClientFactoryBuilder>(ClientFactoryBuilder)
    .toSelf()
    .inSingletonScope();
  const factory = container.resolve<ClientFactoryBuilder>(ClientFactoryBuilder);

  factory.register(container);
  factory.create(container);
}

export function configureContainerForTest(
  container: Container
): TestClientFactory {
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
