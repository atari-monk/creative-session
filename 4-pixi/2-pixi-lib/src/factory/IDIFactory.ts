import { ICreate } from './ICreate';
import { IRegister } from './IRegister';

export interface IDIFactory<T> extends IRegister, ICreate<T> {}
