import { IBall } from '../ball/IBall';

export interface IBallKicker {
  kickBall(ball: IBall): void;
}
