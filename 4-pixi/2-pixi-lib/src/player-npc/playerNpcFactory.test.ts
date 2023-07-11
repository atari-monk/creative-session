import 'reflect-metadata';
import { expect } from 'chai';
import 'mocha';
import {
  configureContainer,
  container,
} from '../di-container/inversify.config';
import { IPlayerNpc } from './IPlayerNpc';
import { PlayerNpc } from './PlayerNpc';

describe('PlayerNpc', () => {
  let player: IPlayerNpc;

  before(() => {
    if (!container.isBound(PlayerNpc)) {
      configureContainer();
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
