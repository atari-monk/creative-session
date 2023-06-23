import {
  IGameObject,
  RivalPlayer,
  RivalPlayerFactory,
} from 'atari-monk-pixi-lib';
import { player1OptionsV2 } from 'atari-monk-pixi-lib';
import { BallGame } from './BallGame';
import { Container } from 'inversify';

const container = new Container();
const rivalPlayerFactory = new RivalPlayerFactory(container);
rivalPlayerFactory.registerDependencies();

export class BallGame2 extends BallGame {
  // prettier-ignore
  protected createPlayer2<TPlayer extends IGameObject = RivalPlayer>(): TPlayer {
    const player = rivalPlayerFactory.resolveRivalPlayer();
    return player as unknown as TPlayer;
  }

  protected createPlayer1() {
    return this.createPlayer(player1OptionsV2, -250);
  }
}
