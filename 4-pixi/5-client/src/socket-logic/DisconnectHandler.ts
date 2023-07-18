import { injectable } from 'inversify';
import { SocketLogicUnit } from '../lib/socket-logic/SocketLogicUnit';

@injectable()
export class DisconnectHandler extends SocketLogicUnit {
  constructor(eventName: string) {
    super(eventName);
  }

  protected logicUnit() {
    console.log('Disconnected from server');
  }
}
