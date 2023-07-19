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
import { EventEmitterLogicManager } from '../../lib/emitter-logic/EventEmitterLogicManager';
import { SharedTypes } from 'atari-monk-game-api-lib';
import EventEmitter from 'eventemitter3';

@injectable()
export class PlayerLogicFactory implements IDIFactory<IPlayerLogic> {
  public register(container: Container) {
    this.registerPlayerManager(container);
    this.registerPlayerSocketLogic(container);
    this.registerPlayerEmitterLogic(container);
  }

  private registerPlayerManager(container: Container) {
    container.bind<IPlayerManager>(PlayerManager).toSelf().inSingletonScope();
    container
      .bind<PlayerManagerCreator>(PlayerManagerCreator)
      .toSelf()
      .inSingletonScope();
  }

  private registerPlayerSocketLogic(container: Container) {
    container
      .bind<PlayerConnectLogic>(PlayerConnectLogic)
      .toDynamicValue(() => {
        return new PlayerConnectLogic(
          'connect',
          container.get<Socket>(Socket),
          container.get<IPlayerManager>(PlayerManager)
        );
      })
      .inSingletonScope();
    container
      .bind<PlayerList>(PlayerList)
      .toDynamicValue(() => {
        return new PlayerList(
          'clientIdList',
          container.get<Socket>(Socket),
          container.get<IPlayerManager>(PlayerManager)
        );
      })
      .inSingletonScope();
    container
      .bind<PlayerMovement>(PlayerMovement)
      .toDynamicValue(() => {
        return new PlayerMovement(
          'movement',
          container.get<IPlayerManager>(PlayerManager)
        );
      })
      .inSingletonScope();

    container.bind(PlayerLogicCreator).toSelf().inSingletonScope();
  }

  private registerPlayerEmitterLogic(container: Container) {
    container
      .bind(PlayerEventEmitterLogicUnit)
      .toDynamicValue(() => {
        return new PlayerEventEmitterLogicUnit(
          'position-update',
          'movement',
          container.get(Socket)
        );
      })
      .inSingletonScope();

    container.bind(EventEmitterLogicManager).toSelf().inRequestScope();

    container.bind(PlayerEmitterCreator).toSelf().inSingletonScope();
  }

  public create(container: Container) {
    const managerCreator = container.get(PlayerManagerCreator);
    const manager = managerCreator.create();
    const logicCreator = container.get(PlayerLogicCreator);
    const logic = logicCreator.create();
    const socket = container.get(Socket);
    logic.initializeSocket(socket);
    const emitterCreator = container.get(PlayerEmitterCreator);
    const emitter = emitterCreator.create();
    const eventEmitter = container.get<EventEmitter>(SharedTypes.EventEmitter);
    emitter.initializeEmitter(eventEmitter);

    const result: IPlayerLogic = {
      manager,
      logic,
      emitter,
    };
    return result;
  }
}
