import { IDrawable } from './IDrawable';
import { IUpdateable } from './IUpdateable';

export interface IGameObject extends IDrawable, IUpdateable {}
