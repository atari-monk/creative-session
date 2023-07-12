import 'reflect-metadata';
import 'mocha';
import { Container } from 'inversify';
import { expect } from 'chai';
import { ISocketConfigurator } from '../ISocketConfigurator';
import { configureContainerForTest } from '../di-container/inversify.config';
import { SocketConfigurator } from '../SocketConfigurator';

describe('Client', () => {
  let socketConfiger: ISocketConfigurator;

  before(() => {
    const container = new Container();
    if (!container.isBound(SocketConfigurator)) {
      configureContainerForTest(container);
    }
    socketConfiger = container.resolve<ISocketConfigurator>(SocketConfigurator);
  });

  it('', () => {
    expect(socketConfiger).to.be.instanceof(SocketConfigurator);
  });
});
