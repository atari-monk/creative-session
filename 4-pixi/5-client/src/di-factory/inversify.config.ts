import { Container } from 'inversify';
import { ClientCreator } from './client/ClientCreator';
import { TestClientCreator } from './client/TestClientCreator';
import { ClientFactory } from './client/ClientFactory';
import { TestClientFactory } from './client/TestClientFactory';

export function configureContainer(container: Container): ClientCreator {
  container.bind<ClientFactory>(ClientFactory).toSelf().inSingletonScope();
  const factory = container.resolve<ClientFactory>(ClientFactory);

  factory.register(container);
  return factory.create(container);
}

export function configureContainerForTest(
  container: Container
): TestClientCreator {
  container
    .bind<TestClientFactory>(TestClientFactory)
    .toSelf()
    .inSingletonScope();
  const factory = container.resolve<TestClientFactory>(TestClientFactory);

  factory.register(container);
  return factory.create(container);
}
