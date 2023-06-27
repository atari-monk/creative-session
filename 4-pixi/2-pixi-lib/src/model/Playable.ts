import { IPlayable } from './IPlayable';

export class Playable implements IPlayable {
  public get isPlayable() {
    return this._isPlayable;
  }

  public set value(isPlayable: boolean) {
    this._isPlayable = isPlayable;
  }

  constructor(private _isPlayable: boolean) {}
}
