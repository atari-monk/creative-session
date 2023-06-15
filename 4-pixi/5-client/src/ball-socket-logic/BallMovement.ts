import { SocketLogicUnit } from 'atari-monk-pixi-lib';
import { BallManager } from '../BallManager';

export class BallMovement extends SocketLogicUnit {
  constructor(eventName: string, private readonly ballManager: BallManager) {
    super(eventName);
  }

  protected logicUnit(newPosition: { x: number; y: number }) {
    if (!newPosition) throw new Error('No position data for the ball!');
    this.ballManager.updateBallPosition(newPosition);
  }
}
