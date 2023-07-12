import 'reflect-metadata';
import 'mocha';
import { Container } from 'inversify';
import { expect } from 'chai';
import { configureContainerForTest } from '../di-container/inversify.config';
import { Socket } from 'socket.io-client';

describe('Client', () => {
  let socket: Socket;

  before(() => {
    const container = new Container();
    if (!container.isBound(Socket)) {
      configureContainerForTest(container);
    }
    socket = container.resolve<Socket>(Socket);
  });

  it('', () => {
    expect(socket).to.be.instanceof(Socket);
  });
});
