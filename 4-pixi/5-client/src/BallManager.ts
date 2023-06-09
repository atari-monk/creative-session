export class BallManager {
  private ballObj: any = null;

  public addBallObj(ball: any) {
    this.ballObj = ball;
  }

  public removeBallObj() {
    this.ballObj = null;
  }

  public updateBallPosition(newPosition: { x: number; y: number }) {
    if (!this.ballObj) {
      throw new Error('No ball object added!');
    }
    this.ballObj.position = newPosition;
  }

  public updateBallVelocity(newVelocity: { x: number; y: number }) {
    if (!this.ballObj) {
      throw new Error('No ball object added!');
    }
    this.ballObj.velocity = newVelocity;
  }
}
