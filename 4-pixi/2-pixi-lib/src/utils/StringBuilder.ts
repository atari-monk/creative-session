export class StringBuilder {
  private parts: string[];

  constructor() {
    this.parts = [];
  }

  append(value: string): void {
    this.parts.push(value);
  }

  toString(): string {
    return this.parts.join('');
  }
}
