import 'reflect-metadata';
import 'mocha';
import { configureContainerForTest } from '../di-container/inversify.test.config';
import { Container } from 'inversify';
import { IBall } from 'atari-monk-game-api-lib';
import { Ball } from './Ball';
import { expect } from 'chai';

describe('Ball', () => {
  let ball: IBall;

  before(() => {
    const container = new Container();
    if (!container.isBound(Ball)) {
      configureContainerForTest(container);
    }
    ball = container.resolve<IBall>(Ball);
  });

  it('ball should be instance of Ball', () => {
    expect(ball).to.be.instanceof(Ball);
  });

  it('ball should have radius 20', () => {
    const params = [ball.model.radius];
    expect(params).to.deep.equal([20]);
  });
});
