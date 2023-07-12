import { Container, injectable } from 'inversify';
import { SocketLogicFactory } from '../socket-logic/SocketLogicFactory';
import { IDIFactory } from '../IDIFactory';
import { ClosedSocketFactory } from '../socket/ClosedSocketFactory';
import { TestClientFactory } from './TestClientFactory';

@injectable()
export class TestClientFactoryBuilder implements IDIFactory<TestClientFactory> {
  register(container: Container) {
    container
      .bind<ClosedSocketFactory>(ClosedSocketFactory)
      .toSelf()
      .inSingletonScope();
    container
      .bind<SocketLogicFactory>(SocketLogicFactory)
      .toSelf()
      .inSingletonScope();
    container
      .bind<TestClientFactory>(TestClientFactory)
      .toSelf()
      .inSingletonScope();
  }

  create(container: Container) {
    const creator = container.resolve<TestClientFactory>(TestClientFactory);
    creator.register(container);
    creator.create(container);
    return creator;
  }
}
