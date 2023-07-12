import { Container } from 'inversify';
import { ClientFactory } from './ClientFactory';
import { SocketLogicFactory } from './SocketLogicFactory';
import { SocketOffFactory } from './socketFactory/SocketOffFactory';
import { SocketFactory } from './socketFactory/SocketFactory';
import { ClientTestFactory } from './ClientTestFactory';

export function configureContainer(container: Container): ClientFactory {
  container.bind<SocketFactory>(SocketFactory).toSelf().inSingletonScope();
  container
    .bind<SocketLogicFactory>(SocketLogicFactory)
    .toSelf()
    .inSingletonScope();
  container.bind<ClientFactory>(ClientFactory).toSelf().inSingletonScope();

  const factory = container.resolve<ClientFactory>(ClientFactory);
  factory.register(container);
  factory.create(container);
  return factory;
}

export function configureContainerForTest(
  container: Container
): ClientTestFactory {
  container
    .bind<SocketOffFactory>(SocketOffFactory)
    .toSelf()
    .inSingletonScope();
  container
    .bind<SocketLogicFactory>(SocketLogicFactory)
    .toSelf()
    .inSingletonScope();
  container
    .bind<ClientTestFactory>(ClientTestFactory)
    .toSelf()
    .inSingletonScope();

  const factory = container.resolve<ClientTestFactory>(ClientTestFactory);
  factory.register(container);
  factory.create(container);
  return factory;
}
