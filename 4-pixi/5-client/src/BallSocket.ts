import { SocketErrorHandler } from './SocketErrorHandler.js';

export class BallSocket {
  private ballObj: any = null;
  private readonly socketConnection: SocketErrorHandler;

  constructor(socketConnection: SocketErrorHandler) {
    this.ballObj = null;
    this.socketConnection = socketConnection;
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
    this.updateBallPosition(newPosition);
  }

  private updateBallPosition(newPosition: { x: number; y: number }) {
    if (!this.ballObj) {
      throw new Error('No ball object added!');
    }
    this.ballObj.position = newPosition;
  }

  private handleBallVelocity(newVelocity: { x: number; y: number }) {
    if (!newVelocity) throw new Error('No velocity data for the ball!');
    this.updateBallVelocity(newVelocity);
  }

  private updateBallVelocity(newVelocity: { x: number; y: number }) {
    if (!this.ballObj) {
      throw new Error('No ball object added!');
    }
    this.ballObj.velocity = newVelocity;
  }

  public addBallObj(ball: any) {
    this.ballObj = ball;
  }

  public removeBallObj() {
    this.ballObj = null;
  }
}
