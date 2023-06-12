import EventEmitter from 'eventemitter3';
import { IEmitterLogic } from './IEmitterLogic.js';

export abstract class EmitterLogicBase implements IEmitterLogic {
  protected readonly emitter: EventEmitter;
  protected readonly eventName: string;

  constructor(emitter: EventEmitter, eventName: string) {
    this.emitter = emitter;
    this.eventName = eventName;
  }

  public addEmitterLogic(): void {
    this.emitter.on(this.eventName, this.eventLogic.bind(this));
  }

  protected abstract eventLogic(...args: any[]): void;
}
