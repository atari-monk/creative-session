import { Container, injectable } from 'inversify';
import { SocketLogicFactory } from '../socket-logic/SocketLogicFactory';
import { IDIFactory } from '../IDIFactory';
import { OpenSocketFactory } from '../socket/OpenSocketFactory';
import { ClientCreator } from './ClientCreator';

@injectable()
export class ClientFactory implements IDIFactory<ClientCreator> {
  register(container: Container) {
    container
      .bind<OpenSocketFactory>(OpenSocketFactory)
      .toSelf()
      .inSingletonScope();
    container
      .bind<SocketLogicFactory>(SocketLogicFactory)
      .toSelf()
      .inSingletonScope();
    container.bind<ClientCreator>(ClientCreator).toSelf().inSingletonScope();
  }

  create(container: Container) {
    const creator = container.resolve<ClientCreator>(ClientCreator);
    creator.register(container);
    creator.create(container);
    return creator;
  }
}
