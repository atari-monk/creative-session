import * as PIXI from 'pixi.js';

export class BasicRenderer {
  public drawPlayerCircle(
    stage: PIXI.Container,
    color: number,
    position: { x: number; y: number },
    radius: number
  ) {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(color);
    graphics.drawCircle(position.x, position.y, radius);
    graphics.endFill();
    stage.addChild(graphics);
  }
}
