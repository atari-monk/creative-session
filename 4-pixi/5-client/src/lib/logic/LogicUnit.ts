import { ILogicUnit } from 'atari-monk-game-api-lib';

export abstract class LogicUnit implements ILogicUnit {
  public abstract logicUnit(...args: any[]): void;
}
