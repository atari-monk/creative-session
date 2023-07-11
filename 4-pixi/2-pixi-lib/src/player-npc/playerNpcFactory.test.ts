import 'reflect-metadata';
import { expect } from 'chai';
import 'mocha';
import { configureContainerForTest } from '../di-container/inversify.config';
import { IPlayerNpc } from './IPlayerNpc';
import { PlayerNpc } from './PlayerNpc';
import { Container } from 'inversify';

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
