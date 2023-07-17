import { IVector2d } from 'atari-monk-game-api-lib';

export class Vector2d implements IVector2d {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  getMagnitude(): number {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  }

  normalize(): void {
    const magnitude = this.getMagnitude();
    if (magnitude === 0) return;
    this._x /= magnitude;
    this._y /= magnitude;
  }

  toString(name: string = 'vector'): string {
    return `${name}: x=${this._x} y=${this._y}`;
  }

  isEqual(b: IVector2d): boolean {
    return this.x === b.x && this.y === b.y;
  }

  static add(a: Vector2d, b: Vector2d): Vector2d {
    return new Vector2d(a.x + b.x, a.y + b.y);
  }

  static subtract(a: Vector2d, b: Vector2d): Vector2d {
    return new Vector2d(a.x - b.x, a.y - b.y);
  }

  static dotProduct(a: Vector2d, b: Vector2d): number {
    return a.x * b.x + a.y * b.y;
  }

  static crossProduct(a: Vector2d, b: Vector2d): number {
    return a.x * b.y - a.y * b.x;
  }
}
