import { KeyboardInputV1 } from './KeyboardInputV1';

export class KeyboardInputHandler {
  constructor(
    private readonly _keyboard: KeyboardInputV1,
    private readonly _keys: any
  ) {}

  public get direction() {
    const direction = { x: 0, y: 0 };

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

    return direction;
  }
}
