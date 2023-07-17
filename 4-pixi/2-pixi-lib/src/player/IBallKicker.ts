import { IBall } from 'atari-monk-game-api-lib';

export interface IBallKicker {
  kickBall(ball: IBall): void;
}
