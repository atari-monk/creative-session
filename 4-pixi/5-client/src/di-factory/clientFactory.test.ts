import 'reflect-metadata';
import 'mocha';
import { Container } from 'inversify';
import { expect } from 'chai';
import { Socket } from 'socket.io-client';
import { configureContainerForTest } from './inversify.config';
import { SocketLogicManager } from 'atari-monk-pixi-lib';
import { TestClientFactory } from './client/TestClientFactory';

describe('Client', () => {
  let factory: TestClientFactory;

  before(() => {
    const container = new Container();
    if (!container.isBound(Socket)) {
      factory = configureContainerForTest(container);
    }
  });

  it('socket should be instance of Socket', () => {
    expect(factory.socket).to.be.instanceof(Socket);
  });

  it('socketLogicManager should be instance of SocketLogicManager', () => {
    expect(factory.socketLogicManager).to.be.instanceof(SocketLogicManager);
  });
});
