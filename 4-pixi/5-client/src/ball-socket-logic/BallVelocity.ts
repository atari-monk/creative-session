import { SocketLogicUnit } from 'atari-monk-pixi-lib';
import { BallManager } from '../BallManager';

export class BallVelocity extends SocketLogicUnit {
  constructor(eventName: string, private readonly ballManager: BallManager) {
    super(eventName);
  }

  protected logicUnit(newVelocity: { x: number; y: number }) {
    if (!newVelocity) throw new Error('No velocity data for the ball!');
    this.ballManager.updateBallVelocity(newVelocity);
  }
}
