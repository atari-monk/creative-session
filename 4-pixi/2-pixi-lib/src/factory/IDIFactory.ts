import { IRegister } from './IRegister';

export interface IDIFactory extends IRegister {
  create(): void;
}
