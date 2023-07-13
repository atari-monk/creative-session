import { Container, injectable } from 'inversify';
import { IDIFactory } from '../IDIFactory';
import { PlayerManagerCreator } from './PlayerManagerCreator';
import { IPlayerManager } from '../../IPlayerManager';
import { PlayerManager } from '../../PlayerManager';
import { PlayerLogicCreator } from './PlayerLogicCreator';
import { PlayerConnectLogic } from '../../socket-logic/PlayerConnectLogic';
import { Socket } from 'socket.io-client';
import { PlayerList } from '../../socket-logic/PlayerList';
import { PlayerMovement } from '../../socket-logic/PlayerMovement';
import { PlayerEmitterCreator } from './PlayerEmitterCreator';
import { IPlayerLogic } from './IPlayerLogic';
import { PlayerEventEmitterLogicUnit } from '../../emitter-logic/PlayerEventEmitterLogicUnit';
import { EventEmitter, EventEmitterLogicManager } from 'atari-monk-pixi-lib';

@injectable()
export class PlayerLogicFactory implements IDIFactory<IPlayerLogic> {
  public register(container: Container) {
    this.registerPlayerManager(container);
    this.registerPlayerSocketLogic(container);
    this.registerPlayerEmitterLogic(container);
  }

  private registerPlayerManager(container: Container) {
    container.bind<IPlayerManager>(PlayerManager).toSelf().inSingletonScope();
  }

  private registerPlayerSocketLogic(container: Container) {
    container
      .bind<PlayerConnectLogic>(PlayerConnectLogic)
      .toDynamicValue(() => {
        return new PlayerConnectLogic(
          'connect',
          container.resolve<Socket>(Socket),
          container.resolve<IPlayerManager>(PlayerManager)
        );
      })
      .inSingletonScope();
    container
      .bind<PlayerList>(PlayerList)
      .toDynamicValue(() => {
        return new PlayerList(
          'clientIdList',
          container.resolve<Socket>(Socket),
          container.resolve<IPlayerManager>(PlayerManager)
        );
      })
      .inSingletonScope();
    container
      .bind<PlayerMovement>(PlayerMovement)
      .toDynamicValue(() => {
        return new PlayerMovement(
          'movement',
          container.resolve<IPlayerManager>(PlayerManager)
        );
      })
      .inSingletonScope();
  }

  private registerPlayerEmitterLogic(container: Container) {
    container
      .bind<PlayerEventEmitterLogicUnit>(PlayerEventEmitterLogicUnit)
      .toDynamicValue(() => {
        return new PlayerEventEmitterLogicUnit(
          'position-update',
          'movement',
          container.resolve<Socket>(Socket)
        );
      })
      .inSingletonScope();

    container
      .bind<EventEmitterLogicManager>(EventEmitterLogicManager)
      .toSelf()
      .inRequestScope();
  }

  public create(container: Container) {
    const manager = container.resolve(PlayerManagerCreator).create();
    const logic = container.resolve(PlayerLogicCreator).create();
    logic.initializeSocket(container.resolve<Socket>(Socket));
    const emitter = container.resolve(PlayerEmitterCreator).create();
    emitter.initializeEmitter(container.resolve<EventEmitter>(EventEmitter));

    const result: IPlayerLogic = {
      manager,
      logic,
      emitter,
    };
    return result;
  }
}
