import { Container } from 'inversify';
import {
  IFieldRenderer,
  IFieldModel,
  IField,
  FieldTypes,
  IDIFactory,
} from 'atari-monk-game-api-lib';
import { FieldRenderer } from './FieldRenderer';
import { Field } from './Field';
import { FieldModel } from './FieldModel';
import { fieldParams } from '../data/ballGameParams';

export class FieldFactory implements IDIFactory<IField> {
  constructor(private readonly container: Container) {}

  public register() {
    this.RegisterModel();
    this.RegisterRenderer();
    this.container.bind<IField>(FieldTypes.Field).to(Field).inSingletonScope();
  }

  private RegisterModel() {
    this.container.bind<IFieldModel>(FieldTypes.Model).toDynamicValue(() => {
      return new FieldModel(fieldParams);
    });
  }

  private RegisterRenderer() {
    this.container.bind<IFieldRenderer>(FieldTypes.Renderer).to(FieldRenderer);
  }

  public create(): IField {
    return this.container.get<IField>(FieldTypes.Field);
  }
}
