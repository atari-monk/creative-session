export interface IColorParams {
  body: number;
  position: number;
  direction: number;
  toString(): string;
}

export const createColorOptions = (
  bodyColor: number,
  positionColor: number,
  directionColor: number
): IColorParams => {
  const colorOptions: IColorParams = {
    body: bodyColor,
    position: positionColor,
    direction: directionColor,
    toString() {
      return `Colors: ${this.body}, ${this.position}, ${this.direction}`;
    },
  };
  return colorOptions;
};
