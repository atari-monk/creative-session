import EventEmitter from 'eventemitter3';
import { LogicManagerGeneric } from '../logic/LogicManagerGeneric';
import { IEventEmitterLogicUnit } from './IEventEmitterLogicUnit';

export class EventEmitterLogicManager extends LogicManagerGeneric<IEventEmitterLogicUnit> {
  public initializeEmitter(emitter: EventEmitter) {
    this.logicUnits.forEach((unit) => {
      unit.initializeEmitter(emitter);
    });
  }
}
