import { IPlayerManager } from '../../IPlayerManager';
import { EventEmitterLogicManager } from '../../lib/emitter-logic/EventEmitterLogicManager';
import { SocketLogicManager } from '../../lib/socket-logic/SocketLogicManager';

export interface IPlayerLogic {
  manager: IPlayerManager;
  logic: SocketLogicManager;
  emitter: EventEmitterLogicManager;
}
