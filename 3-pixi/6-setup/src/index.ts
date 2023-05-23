import * as PIXI from 'pixi.js';

const app = new PIXI.Application<HTMLCanvasElement>({
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
});

document.body.appendChild(app.view);

app.ticker.add(() => {});
