import { BallObject, IVector2d } from 'atari-monk-pixi-lib';

export class BallManager {
  private ballObj: BallObject;

  constructor(ballObj: BallObject) {
    this.ballObj = ballObj;
  }

  public updateBallPosition(newPosition: IVector2d) {
    this.ballObj.position = newPosition;
  }

  public updateBallVelocity(newVelocity: IVector2d) {
    this.ballObj.velocity = newVelocity;
  }
}
