import { injectable } from 'inversify';
import * as PIXI from 'pixi.js';
import { IBasicRenderer } from 'atari-monk-game-api-lib';

@injectable()
export class BasicRenderer implements IBasicRenderer {
  public drawCircle(
    stage: PIXI.Container,
    color: number,
    x: number,
    y: number,
    radius: number
  ) {
    const g = new PIXI.Graphics();
    g.beginFill(color);
    g.drawCircle(x, y, radius);
    g.endFill();
    stage.addChild(g);
  }

  public drawLine(
    stage: PIXI.Container,
    color: number,
    width: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    length: number
  ) {
    const g = new PIXI.Graphics();
    g.lineStyle(width, color);
    g.moveTo(x1, y1);
    const sx2 = x2 * length;
    const sy2 = y2 * length;
    g.lineTo(x1 + sx2, y1 + sy2);
    stage.addChild(g);
  }

  public drawRectangle(
    stage: PIXI.Container,
    color: number,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    const g = new PIXI.Graphics();
    g.beginFill(color);
    g.drawRect(x, y, width, height);
    g.endFill();
    stage.addChild(g);
  }
}
