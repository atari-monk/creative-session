import { Container, injectable } from 'inversify';
import { Manager, Socket } from 'socket.io-client';
import { SocketFactory } from './SocketFactory';

@injectable()
export class OpenSocketFactory extends SocketFactory {
  protected createSocket(container: Container) {
    container
      .bind<Socket>(Socket)
      .toDynamicValue(() => {
        const socketManager = container.resolve<Manager>(Manager);
        return new Socket(socketManager, '/');
      })
      .inSingletonScope();
  }
}
