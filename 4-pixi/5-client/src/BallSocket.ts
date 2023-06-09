import { BallManager } from './BallManager.js';
import { SocketErrorHandler } from './SocketErrorHandler.js';

export class BallSocket {
  private readonly socketConnection: SocketErrorHandler;
  private readonly ballManager: BallManager;

  constructor(socketConnection: SocketErrorHandler, ballManager: BallManager) {
    this.socketConnection = socketConnection;
    this.ballManager = ballManager;

    this.socketConnection.socket.on(
      'ballMovement',
      this.handleBallMovement.bind(this)
    );
    this.socketConnection.socket.on(
      'ballVelocity',
      this.handleBallVelocity.bind(this)
    );
  }

  private handleBallMovement(newPosition: { x: number; y: number }) {
    if (!newPosition) throw new Error('No position data for the ball!');
    this.ballManager.updateBallPosition(newPosition);
  }

  private handleBallVelocity(newVelocity: { x: number; y: number }) {
    if (!newVelocity) throw new Error('No velocity data for the ball!');
    this.ballManager.updateBallVelocity(newVelocity);
  }
}
