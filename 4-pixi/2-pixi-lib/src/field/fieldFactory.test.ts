import 'reflect-metadata';
import { expect } from 'chai';
import 'mocha';
import { configureContainerForTest } from '../di-container/inversify.test.config';
import { IField } from 'atari-monk-game-api-lib';
import { Field } from './Field';
import { Container } from 'inversify';

describe('Field', () => {
  let field: IField;

  before(() => {
    const container = new Container();
    if (!container.isBound(Field)) {
      configureContainerForTest(container);
    }
    field = container.resolve<IField>(Field);
  });

  it('field should be an instance of Field', () => {
    expect(field).to.be.instanceof(Field);
  });

  it('field should have valid model properties', () => {
    const model = field.model;
    expect(model).to.have.property('position');
    expect(model).to.have.property('size');
    expect(model).to.have.property('color');
  });
});
