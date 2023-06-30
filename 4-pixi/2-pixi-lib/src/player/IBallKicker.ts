import { BallObject } from '../BallObject';

export interface IBallKicker {
  kickBall(ball: BallObject): void;
}
