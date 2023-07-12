import { Container } from 'inversify';
import { ClientFactory } from './ClientFactory';
import { SocketLogicFactory } from './SocketLogicFactory';
import { ClientTestFactory } from './ClientTestFactory';
import { ClosedSocketFactory } from './socketFactory/ClosedSocketFactory';
import { OpenSocketFactory } from './socketFactory/OpenSocketFactory';

export function configureContainer(container: Container): ClientFactory {
  container
    .bind<OpenSocketFactory>(OpenSocketFactory)
    .toSelf()
    .inSingletonScope();
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
    .bind<ClosedSocketFactory>(ClosedSocketFactory)
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
