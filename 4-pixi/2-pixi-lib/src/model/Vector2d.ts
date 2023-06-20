export class Vector2d {
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
    if (magnitude !== 0) {
      this._x /= magnitude;
      this._y /= magnitude;
    }
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
