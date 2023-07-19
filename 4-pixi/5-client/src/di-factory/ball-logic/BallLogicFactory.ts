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
import { BallTypes, SharedTypes } from 'atari-monk-game-api-lib';
import EventEmitter from 'eventemitter3';

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
        return new BallMovement('ballMovement', container.get(BallManager));
      })
      .inSingletonScope();

    container
      .bind(BallVelocity)
      .toDynamicValue(() => {
        return new BallVelocity('ballVelocity', container.get(BallManager));
      })
      .inSingletonScope();

    container.bind(BallLogicCreator).toSelf().inSingletonScope();
  }

  private registerBallEmitterLogic(container: Container) {
    container
      .bind<BallEventEmitterLogicUnit>(BallTypes.MovementEmitter)
      .toDynamicValue(() => {
        return new BallEventEmitterLogicUnit(
          'ball-pos-upd',
          'ballMovement',
          container.get(Socket)
        );
      })
      .inSingletonScope();

    container
      .bind<BallEventEmitterLogicUnit>(BallTypes.VelocityEmitter)
      .toDynamicValue(() => {
        return new BallEventEmitterLogicUnit(
          'ball-vel-upd',
          'ballVelocity',
          container.get(Socket)
        );
      })
      .inSingletonScope();

    container.bind(BallEmitterCreator).toSelf().inSingletonScope();
  }

  public create(container: Container) {
    const manager = container.get(BallManager);
    const logicCreator = container.get(BallLogicCreator);
    const logic = logicCreator.create();
    const socket = container.get(Socket);
    logic.initializeSocket(socket);
    const emitterCreator = container.get(BallEmitterCreator);
    const emitter = emitterCreator.create();
    const eventEmitter = container.get<EventEmitter>(SharedTypes.EventEmitter);
    emitter.initializeEmitter(eventEmitter);

    const result: IBallLogic = {
      manager,
      logic,
      emitter,
    };
    return result;
  }
}
