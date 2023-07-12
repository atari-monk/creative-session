import { IDIFactory } from 'atari-monk-pixi-lib/factory/IDIFactory';
import { Container } from 'inversify';
import { SocketConfigurator } from '../SocketConfigurator';
import { ISocketConfigurator } from '../ISocketConfigurator';
import { Environment } from '../Environment';

export class ClientFactory implements IDIFactory {
  constructor(private readonly container: Container) {}

  public register() {
    this.container
      .bind<ISocketConfigurator>(SocketConfigurator)
      .toDynamicValue(() => {
        return new SocketConfigurator({ environment: Environment.Development });
      })
      .inSingletonScope();
  }

  public create() {}
}
