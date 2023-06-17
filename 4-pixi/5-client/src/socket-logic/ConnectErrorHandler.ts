import { SocketLogicUnit } from 'atari-monk-pixi-lib';

export class ConnectErrorHandler extends SocketLogicUnit {
  constructor(eventName: string) {
    super(eventName);
  }

  protected logicUnit(error: Error) {
    console.error('Connection error:', error.message);
  }
}
