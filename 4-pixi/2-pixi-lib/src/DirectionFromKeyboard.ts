import { inject, injectable } from 'inversify';
import { IDirectionFromKeyboard as IDirectionFromKeyboard } from './IDirectionFromKeyboard';
import { KeyboardInputV1 } from './KeyboardInputV1';
import { IKeys } from './data/configTypes';
import { IVector2d } from './model/IVector2d';
import { Vector2d } from './model/Vector2d';
import { PlayablePlayerTypes } from './data/appConfig';

@injectable()
export class DirectionFromKeyboard implements IDirectionFromKeyboard {
  //private _direction: IVector2d;

  constructor(
    @inject(PlayablePlayerTypes.KeyboardInput)
    private readonly _keyboard: KeyboardInputV1,
    @inject(PlayablePlayerTypes.Keys)
    private readonly _keys: IKeys
  ) {
    //this._direction = new Vector2d(0, 0);
  }

  public get direction() {
    const direction = new Vector2d(0, 0);

    if (
      this._keyboard.isKeyDown(this._keys.left) ||
      this._keyboard.isKeyDown(this._keys.a)
    ) {
      direction.x -= 1;
    }

    if (
      this._keyboard.isKeyDown(this._keys.right) ||
      this._keyboard.isKeyDown(this._keys.d)
    ) {
      direction.x += 1;
    }

    if (
      this._keyboard.isKeyDown(this._keys.up) ||
      this._keyboard.isKeyDown(this._keys.w)
    ) {
      direction.y -= 1;
    }

    if (
      this._keyboard.isKeyDown(this._keys.down) ||
      this._keyboard.isKeyDown(this._keys.s)
    ) {
      direction.y += 1;
    }

    const length = Math.sqrt(direction.x ** 2 + direction.y ** 2);
    if (length !== 0) {
      direction.x /= length;
      direction.y /= length;
    }

    return direction as IVector2d;
  }
}
