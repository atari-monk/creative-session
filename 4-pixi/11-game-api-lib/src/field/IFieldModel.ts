import { IVector2d } from "../data-structure/IVector2d";

export interface IFieldModel {
  position: IVector2d;
  size: IVector2d;
  color: number;

  toString(): string;
}
