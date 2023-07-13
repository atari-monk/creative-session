import { BallManager } from '../../BallManager';
import {
  EventEmitterLogicManager,
  SocketLogicManager,
} from 'atari-monk-pixi-lib';

export interface IBallLogic {
  manager: BallManager;
  logic: SocketLogicManager;
  emitter: EventEmitterLogicManager;
}
