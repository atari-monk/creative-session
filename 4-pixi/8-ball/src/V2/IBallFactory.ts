import { IBall, IBallRenderer } from 'atari-monk-pixi-lib';

export interface IBallFactory {
  ball: IBall;
  ballRenderer: IBallRenderer;
}
