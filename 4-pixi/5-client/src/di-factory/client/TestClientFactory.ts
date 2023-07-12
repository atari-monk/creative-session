import { Container, injectable } from 'inversify';
import { SocketLogicFactory } from '../socket-logic/SocketLogicFactory';
import { IDIFactory } from '../IDIFactory';
import { ClosedSocketFactory } from '../socket/ClosedSocketFactory';
import { TestClientCreator } from './TestClientCreator';

@injectable()
export class TestClientFactory implements IDIFactory<TestClientCreator> {
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
      .bind<TestClientCreator>(TestClientCreator)
      .toSelf()
      .inSingletonScope();
  }

  create(container: Container) {
    const creator = container.resolve<TestClientCreator>(TestClientCreator);
    creator.register(container);
    creator.create(container);
    return creator;
  }
}
