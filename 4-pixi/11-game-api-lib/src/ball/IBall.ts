import { IGameObject } from "../game-obj/IGameObject";
import { IToString } from "../object/IToString";
import { IBallModel } from "./IBallModel";

export interface IBall extends IGameObject, IToString {
  model: IBallModel;
  bounce(): void;
  emittVelocity(): void;
}
