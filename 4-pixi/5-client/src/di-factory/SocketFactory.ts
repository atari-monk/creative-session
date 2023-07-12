import { Container } from 'inversify';
import { Manager, Socket } from 'socket.io-client';
import { IDIFactory } from 'atari-monk-pixi-lib';
import { SocketConfigurator } from '../SocketConfigurator';
import { ISocketConfigurator } from '../ISocketConfigurator';
import { Environment } from '../Environment';
import { SocketErrorHandler } from '../SocketErrorHandler';

export class SocketFactory implements IDIFactory<Socket> {
  constructor(private readonly container: Container) {}

  public register() {
    this.regSocket();
  }

  private regSocket() {
    this.container
      .bind<ISocketConfigurator>(SocketConfigurator)
      .toDynamicValue(() => {
        return new SocketConfigurator({ environment: Environment.Development });
      })
      .inSingletonScope();

    this.container
      .bind<Manager>(Manager)
      .toDynamicValue(() => {
        const configer =
          this.container.resolve<ISocketConfigurator>(SocketConfigurator);
        return new Manager(configer.URI);
      })
      .inSingletonScope();

    this.container
      .bind<Socket>(Socket)
      .toDynamicValue(() => {
        const socketManager = this.container.resolve<Manager>(Manager);
        return new Socket(socketManager, '/');
      })
      .inSingletonScope();

    this.container
      .bind<SocketErrorHandler>(SocketErrorHandler)
      .to(SocketErrorHandler)
      .inSingletonScope();
  }

  public create(): Socket {
    const socket = this.container.resolve<Socket>(Socket);
    this.container.resolve<SocketErrorHandler>(SocketErrorHandler);
    return socket;
  }
}
