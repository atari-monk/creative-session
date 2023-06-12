import { SocketLogicBase } from '../socket-logic/SocketLogicBase';
import { Socket } from 'socket.io-client';
import { BallManager } from '../BallManager';

export class BallVelocity extends SocketLogicBase {
  private ballManager: BallManager;

  constructor(socket: Socket, ballManager: BallManager) {
    super(socket, 'ballVelocity');
    this.ballManager = ballManager;
  }

  protected eventLogic(newVelocity: { x: number; y: number }) {
    if (!newVelocity) throw new Error('No velocity data for the ball!');
    this.ballManager.updateBallVelocity(newVelocity);
  }
}
