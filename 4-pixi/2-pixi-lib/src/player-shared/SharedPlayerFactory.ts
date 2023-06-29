import { Container } from 'inversify';
import { SharedTypes } from '../data/appConfig';
import { IBasicRenderer } from '../IBasicRenderer';
import { BasicRenderer } from '../BasicRenderer';

export class SharedPlayerFactory {
  constructor(public readonly container: Container) {}

  public registerDependencies() {
    this.container
      .bind<IBasicRenderer>(SharedTypes.BasicRenderer)
      .to(BasicRenderer)
      .inSingletonScope();
  }
}
