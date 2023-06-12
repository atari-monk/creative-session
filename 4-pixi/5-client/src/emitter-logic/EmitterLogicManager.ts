import { IEmitterLogic } from './IEmitterLogic.js';

export abstract class EmitterLogicManager {
  private readonly handlers: IEmitterLogic[] = [];

  public addLogic(logic: IEmitterLogic) {
    this.handlers.push(logic);
  }

  public setEmitter() {
    this.handlers.forEach((logic) => logic.addEmitterLogic());
  }
}
