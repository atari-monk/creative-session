import { IBall, IVector2d } from 'atari-monk-pixi-lib';

export class BallManager {
  private ball: IBall;

  constructor(ball: IBall) {
    this.ball = ball;
  }

  public updateBallPosition(newPosition: IVector2d) {
    this.ball.position = newPosition;
  }

  public updateBallVelocity(newVelocity: IVector2d) {
    this.ball.velocity = newVelocity;
  }
}
