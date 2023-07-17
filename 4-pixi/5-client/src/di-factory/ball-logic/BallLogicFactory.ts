import { Container, injectable } from 'inversify';
import { IBallLogic } from './IBallLogic';
import { BallManager } from '../../BallManager';
import { BallMovement } from '../../socket-logic/BallMovement';
import { BallVelocity } from '../../socket-logic/BallVelocity';
import { BallEventEmitterLogicUnit } from '../../emitter-logic/BallEventEmitterLogicUnit';
import { Socket } from 'socket.io-client';
import { BallLogicCreator } from './BallLogicCreator';
import { BallEmitterCreator } from './BallEmitterCreator';
import { IDIFactory } from '../IDIFactory';
import { BallTypes } from '../types';

@injectable()
export class BallLogicFactory implements IDIFactory<IBallLogic> {
  public register(container: Container) {
    this.registerBallManager(container);
    this.registerBallSocketLogic(container);
    this.registerBallEmitterLogic(container);
  }

  private registerBallManager(container: Container) {
    container.bind(BallManager).toSelf().inSingletonScope();
  }

  private registerBallSocketLogic(container: Container) {
    container
      .bind(BallMovement)
      .toDynamicValue(() => {
        return new BallMovement('ballMovement', container.resolve(BallManager));
      })
      .inSingletonScope();

    container
      .bind(BallVelocity)
      .toDynamicValue(() => {
        return new BallVelocity('ballVelocity', container.resolve(BallManager));
      })
      .inSingletonScope();
  }

  private registerBallEmitterLogic(container: Container) {
    container
      .bind<BallEventEmitterLogicUnit>(BallTypes.MovementEmitter)
      .toDynamicValue(() => {
        return new BallEventEmitterLogicUnit(
          'ball-pos-upd',
          'ballMovement',
          container.resolve(Socket)
        );
      })
      .inSingletonScope();

    container
      .bind<BallEventEmitterLogicUnit>(BallTypes.VelocityEmitter)
      .toDynamicValue(() => {
        return new BallEventEmitterLogicUnit(
          'ball-vel-upd',
          'ballVelocity',
          container.resolve(Socket)
        );
      })
      .inSingletonScope();
  }

  public create(container: Container) {
    const manager = container.resolve(BallManager);
    const logic = container.resolve(BallLogicCreator).create();
    const emitter = container.resolve(BallEmitterCreator).create();

    const result: IBallLogic = {
      manager,
      logic,
      emitter,
    };
    return result;
  }
}
