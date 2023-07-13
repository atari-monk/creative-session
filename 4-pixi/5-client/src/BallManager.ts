import { Ball, IBall, IVector2d } from 'atari-monk-pixi-lib';
import { inject, injectable } from 'inversify';

@injectable()
export class BallManager {
  constructor(
    @inject(Ball)
    private readonly ball: IBall
  ) {}

  public updateBallPosition(newPosition: IVector2d) {
    this.ball.model.position = newPosition;
  }

  public updateBallVelocity(newVelocity: IVector2d) {
    this.ball.model.velocity = newVelocity;
  }
}
