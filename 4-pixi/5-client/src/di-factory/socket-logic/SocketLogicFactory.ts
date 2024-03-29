import { Container, injectable } from 'inversify';
import { ConnectErrorHandler } from '../../socket-logic/ConnectErrorHandler';
import { DisconnectHandler } from '../../socket-logic/DisconnectHandler';
import { SocketLogicCreator } from './SocketLogicCreator';
import { IDIFactory } from '../IDIFactory';
import { SocketLogicManager } from '../../lib/socket-logic/SocketLogicManager';

@injectable()
export class SocketLogicFactory implements IDIFactory<SocketLogicManager> {
  public register(container: Container) {
    container
      .bind<ConnectErrorHandler>(ConnectErrorHandler)
      .toDynamicValue(() => {
        return new ConnectErrorHandler('connect_error');
      })
      .inSingletonScope();

    container
      .bind<DisconnectHandler>(DisconnectHandler)
      .toDynamicValue(() => {
        return new DisconnectHandler('disconnect');
      })
      .inSingletonScope();

    container
      .bind<SocketLogicManager>(SocketLogicManager)
      .toSelf()
      .inRequestScope();
  }

  public create(container: Container): SocketLogicManager {
    return container.resolve(SocketLogicCreator).create();
  }
}
