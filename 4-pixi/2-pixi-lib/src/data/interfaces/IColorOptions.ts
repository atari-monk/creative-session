export interface IColorOptions {
  body: number;
  position: number;
  direction: number;
  toString(): string;
}

export const createColorOptions = (
  bodyColor: number,
  positionColor: number,
  directionColor: number
): IColorOptions => {
  const colorOptions: IColorOptions = {
    body: bodyColor,
    position: positionColor,
    direction: directionColor,
    toString() {
      return `Colors: ${this.body}, ${this.position}, ${this.direction}`;
    },
  };
  return colorOptions;
};
