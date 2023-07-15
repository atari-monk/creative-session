import { Container, injectable } from 'inversify';
import { SocketLogicFactory } from '../socket-logic/SocketLogicFactory';
import { IDIFactory } from '../IDIFactory';
import { OpenSocketFactory } from '../socket/OpenSocketFactory';
import { ClientFactory } from './ClientFactory';
import { PlayerLogicFactory } from '../player-logic/PlayerLogicFactory';
import { BallLogicFactory } from '../ball-logic/BallLogicFactory';

@injectable()
export class ClientFactoryBuilder implements IDIFactory<ClientFactory> {
  register(container: Container) {
    container.bind(OpenSocketFactory).toSelf().inSingletonScope();
    container.bind(SocketLogicFactory).toSelf().inSingletonScope();
    container.bind(PlayerLogicFactory).toSelf().inSingletonScope();
    container.bind(BallLogicFactory).toSelf().inSingletonScope();
    container.bind(ClientFactory).toSelf().inSingletonScope();
  }

  create(container: Container) {
    const creator = container.resolve(ClientFactory);
    creator.register(container);
    creator.create(container);
    return creator;
  }
}
