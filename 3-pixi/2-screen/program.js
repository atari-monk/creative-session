import { App } from '../pixi-lib/App.js';

const option = {
  canvasId: 'mainCanvasId',
  backgroundColor: 0x000000,
  width: 800,
  height: 600,
  fullScreen: false,
  log: true,
};

const app = new App(option);
app.startAnimationLoop();
