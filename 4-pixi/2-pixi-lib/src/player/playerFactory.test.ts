import 'reflect-metadata';
import { expect } from 'chai';
import 'mocha';
import { configureContainerForTest } from '../di-container/inversify.test.config';
import { IPlayer } from 'atari-monk-game-api-lib';
import { Player } from './Player';
import { Container } from 'inversify';

describe('Player', () => {
  let player: IPlayer;

  before(() => {
    const container = new Container();
    if (!container.isBound(Player)) {
      configureContainerForTest(container);
    }
    player = container.resolve<IPlayer>(Player);
  });

  it('player should be instance of Player', () => {
    expect(player).to.be.instanceof(Player);
  });

  it('player should be playable', () => {
    const params = [player.model.isPlayable];
    expect(params).to.deep.equal([true]);
  });
});
