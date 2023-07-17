import { ICircle } from "../model/ICircle";
import { IClientId } from "../model/IClientId";
import { IDirection } from "../model/IDirection";
import { IPlayable } from "../model/IPlayable";
import { IPosition } from "../model/IPosition";
import { IRadius } from "../model/IRadius";
import { ISpeed } from "../model/ISpeed";
import { IToString } from "../object/IToString";
import { IPlayerParams } from "./IPlayerParams";

export interface IPlayerModel
  extends IPosition,
    IDirection,
    ISpeed,
    IRadius,
    ICircle,
    IPlayable,
    IClientId,
    IToString {
  params: IPlayerParams;
}
