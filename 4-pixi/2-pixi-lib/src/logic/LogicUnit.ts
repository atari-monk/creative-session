import { ILogicUnit } from './ILogicUnit.js';

export abstract class LogicUnit implements ILogicUnit {
  public abstract logicUnit(...args: any[]): void;
}
