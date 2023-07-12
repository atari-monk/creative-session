import { Container, injectable } from 'inversify';
import { Manager, Socket } from 'socket.io-client';
import { SocketFactory } from './SocketFactory';

@injectable()
export class ClosedSocketFactory extends SocketFactory {
  protected createSocket(container: Container) {
    container
      .bind<Socket>(Socket)
      .toDynamicValue(() => {
        const socketManager = container.resolve<Manager>(Manager);
        const socket = new Socket(socketManager, '/');
        socket.close();
        return socket;
      })
      .inSingletonScope();
  }
}
