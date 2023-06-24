import {
  IGameObject,
  PlayerComputation,
  PlayerObject,
  RivalPlayer,
  RivalPlayerFactory,
} from 'atari-monk-pixi-lib';
import { player1OptionsV2 } from 'atari-monk-pixi-lib';
import { BallGame } from './BallGame';
import { Container } from 'inversify';
import { IPlayerOptionsV2 } from 'atari-monk-pixi-lib/data/configTypes';

const container = new Container();
const rivalPlayerFactory = new RivalPlayerFactory(container);
rivalPlayerFactory.registerDependencies();

export class BallGame2 extends BallGame {
  // prettier-ignore
  protected createPlayer2<TPlayer extends IGameObject = RivalPlayer>(): TPlayer {
    const player = rivalPlayerFactory.resolveRivalPlayer();
    return player as unknown as TPlayer;
  }

  private createPlayerV2(playerOptions: IPlayerOptionsV2) {
    const playerComputation = new PlayerComputation(
      this.keyboard,
      this.positionEmitter,
      playerOptions
    );
    const player = new PlayerObject(
      this.playerRenderer,
      playerComputation,
      playerOptions
    );
    player.position = playerOptions.position;
    return player;
  }

  protected createPlayer1() {
    return this.createPlayerV2(player1OptionsV2);
  }
}
