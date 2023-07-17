import 'reflect-metadata';
import 'mocha';
import { Container } from 'inversify';
import { expect } from 'chai';
import { Socket } from 'socket.io-client';
import {
  EventEmitterLogicManager,
  SocketLogicManager,
  configureContainerForTest as pixiConfigureContainerForTest,
} from 'atari-monk-pixi-lib';
import { configureContainerForTest } from './inversify.config';
import { TestClientFactory } from './client/TestClientFactory';
import { PlayerManager } from '../PlayerManager';
import { BallManager } from '../BallManager';

describe('Client', () => {
  let factory: TestClientFactory;

  before(() => {
    const container = new Container();
    if (!container.isBound(Socket)) {
      pixiConfigureContainerForTest(container);
      factory = configureContainerForTest(container);
    }
  });

  it('socket should be instance of Socket', () => {
    expect(factory.socket).to.be.instanceof(Socket);
  });

  it('socketLogicManager should be instance of SocketLogicManager', () => {
    expect(factory.socketLogicManager).to.be.instanceof(SocketLogicManager);
  });

  it('playerManager should be instance of PlayerManager', () => {
    expect(factory.playerLogic.manager).to.be.instanceof(PlayerManager);
  });

  it('playerSocketLogicManager should be instance of SocketLogicManager', () => {
    expect(factory.playerLogic.logic).to.be.instanceof(SocketLogicManager);
  });

  it('playerEmitterLogicManager should be instance of EventEmitterLogicManager', () => {
    expect(factory.playerLogic.emitter).to.be.instanceof(
      EventEmitterLogicManager
    );
  });

  it('ballManager should be instance of BallManager', () => {
    expect(factory.ballLogic.manager).to.be.instanceof(BallManager);
  });

  it('ballSocketLogicManager should be instance of SocketLogicManager', () => {
    expect(factory.ballLogic.logic).to.be.instanceof(SocketLogicManager);
  });

  it('ballEmitterLogicManager should be instance of EventEmitterLogicManager', () => {
    expect(factory.ballLogic.emitter).to.be.instanceof(
      EventEmitterLogicManager
    );
  });
});
