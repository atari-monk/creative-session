import {
  IGameObject,
  RivalPlayer,
  RivalPlayerFactory,
  PlayerFactory,
  SharedPlayerFactory,
} from 'atari-monk-pixi-lib';
import { BallGame } from './BallGame';
import { Container } from 'inversify';

const container = new Container();
const sharedPlayerFactory = new SharedPlayerFactory(container);
const rivalPlayerFactory = new RivalPlayerFactory(container);
sharedPlayerFactory.registerDependencies();
rivalPlayerFactory.registerDependencies();
const playerFactory = new PlayerFactory(container);
playerFactory.registerDependencies();

export class BallGame2 extends BallGame {
  // prettier-ignore
  protected createPlayer1<TPlayer extends IGameObject = RivalPlayer>(): TPlayer {
    const player = playerFactory.resolve();
    return player as unknown as TPlayer;
  }

  // prettier-ignore
  protected createPlayer2<TPlayer extends IGameObject = RivalPlayer>(): TPlayer {
    const player = rivalPlayerFactory.resolve();
    return player as unknown as TPlayer;
  }
}
