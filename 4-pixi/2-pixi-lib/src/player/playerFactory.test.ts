import 'reflect-metadata';
import { expect } from 'chai';
import 'mocha';
import {
  configureContainerForTest,
  container,
} from '../di-container/inversify.config';
import { IPlayer } from './IPlayer';
import { Player } from './Player';

describe('Player', () => {
  let player: IPlayer;

  before(() => {
    if (!container.isBound(Player)) {
      configureContainerForTest();
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
