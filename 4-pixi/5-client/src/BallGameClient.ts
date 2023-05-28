import { GameClient } from './GameClient.js';

export class BallGameClient extends GameClient {
  private ballObj: any = null;

  constructor() {
    super();
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
    this.ballObj.setPosition({ ...newPosition });
  }

  private updateBallVelocity(newVelocity: any): void {
    if (!this.ballObj) {
      throw new Error('No ball object added!');
    }
    this.ballObj.setVelocity({ ...newVelocity });
  }

  private handleBallMovement({ newPosition }: any): void {
    if (!newPosition) throw new Error('No position data for the ball!');
    this.updateBallPosition(newPosition);
  };

  private handleBallVelocity({ newVelocity }: any): void {
    if (!newVelocity) throw new Error('No velocity data for the ball!');
    this.updateBallVelocity(newVelocity);
  };

  protected setupSocketConnection(): void {
    super.setupSocketConnection();
    this.socket?.on('ballMovement', this.handleBallMovement.bind(this));
    this.socket?.on('ballVelocity', this.handleBallVelocity.bind(this));
  }
}
