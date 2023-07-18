import { BallManager } from '../../BallManager';
import { EventEmitterLogicManager } from '../../lib/emitter-logic/EventEmitterLogicManager';
import { SocketLogicManager } from '../../lib/socket-logic/SocketLogicManager';

export interface IBallLogic {
  manager: BallManager;
  logic: SocketLogicManager;
  emitter: EventEmitterLogicManager;
}
