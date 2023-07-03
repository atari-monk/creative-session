import { IIdModel } from './IIdModel';

export class IdModel implements IIdModel {
  public get id() {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  constructor(private _id: string) {}
}
