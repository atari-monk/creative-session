import { Container } from 'inversify';
import { ClientFactory } from './client/ClientFactory';
import { TestClientFactory } from './client/TestClientFactory';
import { ClientFactoryBuilder } from './client/ClientFactoryBuilder';
import { TestClientFactoryBuilder } from './client/TestClientFactoryBuilder';

export function configureContainer(container: Container): ClientFactory {
  container
    .bind<ClientFactoryBuilder>(ClientFactoryBuilder)
    .toSelf()
    .inSingletonScope();
  const factory = container.resolve<ClientFactoryBuilder>(ClientFactoryBuilder);

  factory.register(container);
  return factory.create(container);
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
