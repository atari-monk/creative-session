import { Container, injectable } from 'inversify';
import { SocketLogicManager } from 'atari-monk-pixi-lib';
import { ConnectErrorHandler } from '../socket-logic/ConnectErrorHandler';
import { DisconnectHandler } from '../socket-logic/DisconnectHandler';
import { SocketLogicCreator } from './SocketLogicCreator';
import { IDIFactory } from './IDIFactory';

@injectable()
export class SocketLogicFactory implements IDIFactory<SocketLogicManager> {
  public register(container: Container) {
    container
      .bind<ConnectErrorHandler>(ConnectErrorHandler)
      .toDynamicValue(() => {
        return new ConnectErrorHandler('connect_error');
      });
    container.bind<DisconnectHandler>(DisconnectHandler).toDynamicValue(() => {
      return new DisconnectHandler('disconnect');
    });
    container
      .bind<SocketLogicManager>(SocketLogicManager)
      .to(SocketLogicManager);
  }

  public create(container: Container): SocketLogicManager {
    return container.resolve(SocketLogicCreator).createSocketLogic();
  }
}
