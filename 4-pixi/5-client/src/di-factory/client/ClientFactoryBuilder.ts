import { Container, injectable } from 'inversify';
import { SocketLogicFactory } from '../socket-logic/SocketLogicFactory';
import { IDIFactory } from '../IDIFactory';
import { OpenSocketFactory } from '../socket/OpenSocketFactory';
import { ClientFactory } from './ClientFactory';

@injectable()
export class ClientFactoryBuilder implements IDIFactory<ClientFactory> {
  register(container: Container) {
    container
      .bind<OpenSocketFactory>(OpenSocketFactory)
      .toSelf()
      .inSingletonScope();
    container
      .bind<SocketLogicFactory>(SocketLogicFactory)
      .toSelf()
      .inSingletonScope();
    container.bind<ClientFactory>(ClientFactory).toSelf().inSingletonScope();
  }

  create(container: Container) {
    const creator = container.resolve<ClientFactory>(ClientFactory);
    creator.register(container);
    creator.create(container);
    return creator;
  }
}
