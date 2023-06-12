import { Socket } from 'socket.io-client';
import { ISocketLogic } from './ISocketLogic.js';

export abstract class SocketLogicManager {
  private readonly socket: Socket;
  private readonly handlers: ISocketLogic[] = [];

  constructor(socket: Socket) {
    this.socket = socket;
  }

  public addLogic(logic: ISocketLogic) {
    this.handlers.push(logic);
  }

  public setSocket() {
    this.handlers.forEach((logic) => logic.addSocketLogic());
  }
}
