import { Container } from 'inversify';
import { SharedTypes } from '../data/appConfig';
import { IBasicRenderer } from '../IBasicRenderer';
import { BasicRenderer } from '../BasicRenderer';
import EventEmitter from 'eventemitter3';

export class ServiceFactory {
  constructor(public readonly container: Container) {}

  public register() {
    this.container
      .bind<IBasicRenderer>(SharedTypes.BasicRenderer)
      .to(BasicRenderer)
      .inSingletonScope();

    this.container
      .bind<EventEmitter>(SharedTypes.EventEmitter)
      .toConstantValue(new EventEmitter());
  }
}
