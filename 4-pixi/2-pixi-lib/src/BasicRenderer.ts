import * as PIXI from 'pixi.js';

export class BasicRenderer {
  public drawCircle(
    stage: PIXI.Container,
    color: number,
    position: { x: number; y: number },
    radius: number
  ) {
    const g = new PIXI.Graphics();
    g.beginFill(color);
    g.drawCircle(position.x, position.y, radius);
    g.endFill();
    stage.addChild(g);
  }

  public drawLine(
    stage: PIXI.Container,
    color: number,
    width: number,
    position: { x: number; y: number },
    direction: { x: number; y: number },
    length: number
  ) {
    const g = new PIXI.Graphics();
    g.lineStyle(width, color);
    g.moveTo(position.x, position.y);
    const directionX = direction.x * length;
    const directionY = direction.y * length;
    g.lineTo(position.x + directionX, position.y + directionY);
    stage.addChild(g);
  }
}
