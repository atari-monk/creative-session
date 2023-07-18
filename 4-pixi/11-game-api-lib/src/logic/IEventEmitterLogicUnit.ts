import EventEmitter from "eventemitter3";

export interface IEventEmitterLogicUnit {
  initializeEmitter(emitter: EventEmitter): void;
}
