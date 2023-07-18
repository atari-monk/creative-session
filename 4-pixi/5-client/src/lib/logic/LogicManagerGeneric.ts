import { injectable } from 'inversify';

@injectable()
export abstract class LogicManagerGeneric<T> {
  private readonly _logicUnits: T[] = [];

  get logicUnits(): T[] {
    return this._logicUnits;
  }

  public addLogic(logic: T) {
    this._logicUnits.push(logic);
  }
}
