import { SocketLogicUnit } from 'atari-monk-pixi-lib';

export class DisconnectHandler extends SocketLogicUnit {
  constructor(eventName: string) {
    super(eventName);
  }

  protected logicUnit() {
    console.log('Disconnected from server');
  }
}
