import { IPlayerManager } from '../../IPlayerManager';
import {
  EventEmitterLogicManager,
  SocketLogicManager,
} from 'atari-monk-pixi-lib';

export interface IPlayerLogic {
  manager: IPlayerManager;
  logic: SocketLogicManager;
  emitter: EventEmitterLogicManager;
}
