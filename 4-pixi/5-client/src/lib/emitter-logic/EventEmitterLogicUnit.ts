import EventEmitter from 'eventemitter3';
import { IEventEmitterLogicUnit } from 'atari-monk-game-api-lib';

export abstract class EventEmitterLogicUnit implements IEventEmitterLogicUnit {
  constructor(private readonly _eventName: string) {}

  public initializeEmitter(emitter: EventEmitter): void {
    emitter.on(this._eventName, this.logicUnit.bind(this));
  }

  protected abstract logicUnit(...args: any[]): void;
}
