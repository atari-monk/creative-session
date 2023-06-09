import { BallObject } from '../../2-pixi-lib/dist/BallObject';

export class BallManager {
  private ballObj: BallObject;

  constructor(ballObj: BallObject) {
    this.ballObj = ballObj;
  }

  public updateBallPosition(newPosition: { x: number; y: number }) {
    this.ballObj.position = newPosition;
  }

  public updateBallVelocity(newVelocity: { x: number; y: number }) {
    this.ballObj.velocity = newVelocity;
  }
}
