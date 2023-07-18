import { BallTypes, IBall, IVector2d } from 'atari-monk-game-api-lib';
import { inject, injectable } from 'inversify';

@injectable()
export class BallManager {
  constructor(
    @inject(BallTypes.Ball)
    private readonly ball: IBall
  ) {}

  public updateBallPosition(newPosition: IVector2d) {
    this.ball.model.position = newPosition;
  }

  public updateBallVelocity(newVelocity: IVector2d) {
    this.ball.model.velocity = newVelocity;
  }
}
