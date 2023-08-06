import * as PIXI from 'pixi.js';

export interface IBasicRenderer {
  drawCircle(
    stage: PIXI.Container,
    color: number,
    x: number,
    y: number,
    radius: number
  ): void;

  drawLine(
    stage: PIXI.Container,
    color: number,
    width: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    length: number
  ): void;

  drawRectangle(
    stage: PIXI.Container,
    color: number,
    x: number,
    y: number,
    width: number,
    height: number
  ): void;
}
