import { GameClient } from './GameClient.js';
import { EventEmitter } from 'eventemitter3';

export class BallGameClient extends GameClient {
  private ballObj: any = null;

  constructor(positionEmitter: EventEmitter) {
    super(positionEmitter);
    this.ballObj = null;
  }

  public addBallObj(ball: any): void {
    this.ballObj = ball;
  }

  public removeBallObj(): void {
    this.ballObj = null;
  }

  private updateBallPosition(newPosition: any): void {
    if (!this.ballObj) {
      throw new Error('No ball object added!');
    }
    this.ballObj.position = newPosition;
  }

  private updateBallVelocity(newVelocity: any): void {
    if (!this.ballObj) {
      throw new Error('No ball object added!');
    }
    this.ballObj.velocity = newVelocity;
  }

  private handleBallMovement({ newPosition }: any): void {
    if (!newPosition) throw new Error('No position data for the ball!');
    this.updateBallPosition(newPosition);
  }

  private handleBallVelocity({ newVelocity }: any): void {
    if (!newVelocity) throw new Error('No velocity data for the ball!');
    this.updateBallVelocity(newVelocity);
  }

  protected setupSocketConnection(): void {
    super.setupSocketConnection();
    this.socket?.on('ballMovement', this.handleBallMovement.bind(this));
    this.socket?.on('ballVelocity', this.handleBallVelocity.bind(this));
  }
}
