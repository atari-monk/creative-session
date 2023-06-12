import { SocketLogicBase } from '../socket-logic/SocketLogicBase';
import { Socket } from 'socket.io-client';
import { BallManager } from '../BallManager';

export class BallMovement extends SocketLogicBase {
  private ballManager: BallManager;

  constructor(socket: Socket, ballManager: BallManager) {
    super(socket, 'ballMovement');
    this.ballManager = ballManager;
  }

  protected eventLogic(newPosition: { x: number; y: number }) {
    if (!newPosition) throw new Error('No position data for the ball!');
    this.ballManager.updateBallPosition(newPosition);
  }
}
