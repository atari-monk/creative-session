import { Container } from 'inversify';
import 'reflect-metadata';
import { expect } from 'chai';
import 'mocha';
import { IPlayerNpc } from 'atari-monk-game-api-lib';
import { configureContainerForTest } from '../di-container/inversify.test.config';
import { PlayerNpc } from './PlayerNpc';

describe('PlayerNpc', () => {
  let player: IPlayerNpc;

  before(() => {
    const container = new Container();
    if (!container.isBound(PlayerNpc)) {
      configureContainerForTest(container);
    }
    player = container.resolve<IPlayerNpc>(PlayerNpc);
  });

  it('player npc should be instance of PlayerNpc', () => {
    expect(player).to.be.instanceof(PlayerNpc);
  });

  it('player npc should be not playable', () => {
    const params = [player.model.isPlayable];
    expect(params).to.deep.equal([false]);
  });
});
