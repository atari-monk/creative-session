import { Container, injectable } from 'inversify';
import { SocketLogicFactory } from '../socket-logic/SocketLogicFactory';
import { IDIFactory } from '../IDIFactory';
import { ClosedSocketFactory } from '../socket/ClosedSocketFactory';
import { TestClientFactory } from './TestClientFactory';
import { PlayerLogicFactory } from '../player-logic/PlayerLogicFactory';
import { BallLogicFactory } from '../ball-logic/BallLogicFactory';

@injectable()
export class TestClientFactoryBuilder implements IDIFactory<TestClientFactory> {
  register(container: Container) {
    container.bind(ClosedSocketFactory).toSelf().inSingletonScope();
    container.bind(SocketLogicFactory).toSelf().inSingletonScope();
    container.bind(PlayerLogicFactory).toSelf().inSingletonScope();
    container.bind(BallLogicFactory).toSelf().inSingletonScope();
    container.bind(TestClientFactory).toSelf().inSingletonScope();
  }

  create(container: Container) {
    const creator = container.resolve(TestClientFactory);
    creator.register(container);
    creator.create(container);
    return creator;
  }
}
