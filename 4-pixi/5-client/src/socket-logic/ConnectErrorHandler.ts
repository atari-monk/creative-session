import { injectable } from 'inversify';
import { SocketLogicUnit } from '../lib/socket-logic/SocketLogicUnit';

@injectable()
export class ConnectErrorHandler extends SocketLogicUnit {
  constructor(eventName: string) {
    super(eventName);
  }

  protected logicUnit(error: Error) {
    console.error('Connection error:', error.message);
  }
}
