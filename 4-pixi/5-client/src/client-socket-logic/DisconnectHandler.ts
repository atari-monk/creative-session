import { SocketLogicUnit } from '../socket-logic/SocketLogicUnit.js';

export class DisconnectHandler extends SocketLogicUnit {
  constructor(eventName: string) {
    super(eventName);
  }

  protected logicUnit() {
    console.log('Disconnected from server');
  }
}
