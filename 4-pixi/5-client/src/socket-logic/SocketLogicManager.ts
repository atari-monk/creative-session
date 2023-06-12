import { ISocketLogic } from './ISocketLogic.js';

export abstract class SocketLogicManager {
  private readonly handlers: ISocketLogic[] = [];

  public addLogic(logic: ISocketLogic) {
    this.handlers.push(logic);
  }

  public setSocket() {
    this.handlers.forEach((logic) => logic.addSocketLogic());
  }
}
