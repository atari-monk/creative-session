import { Socket } from 'socket.io-client';
import { ISetSocketOnHandler } from './ISetSocketOnHandler.js';

export class PlayerSocketManager {
  private readonly socket: Socket;
  private readonly handlers: ISetSocketOnHandler[] = [];

  constructor(socket: Socket) {
    this.socket = socket;
  }

  public addLogic(logic: ISetSocketOnHandler) {
    this.handlers.push(logic);
  }

  public setSocket() {
    this.handlers.forEach((logic) => logic.setSocketOnHandler());
  }
}
