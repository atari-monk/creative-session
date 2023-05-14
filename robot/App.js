import { Robot } from './Robot.js';
import { StickFigure } from './StickFigure.js';
import { KeyboardHandler } from './KeyboardHandler.js';

export class App {
  constructor(canvasId, width, height, backgroundColor) {
    this.canvas = document.getElementById(canvasId);
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;

    this.createApp();
    this.keyboard = new KeyboardHandler(); // Create a keyboard handler
    this.createRobot();
    this.createStickFigure();
    this.startAnimationLoop();
  }

  createApp() {
    this.app = new PIXI.Application({
      view: this.canvas,
      width: this.width,
      height: this.height,
      backgroundColor: this.backgroundColor,
    });
  }

  createRobot() {
    const robotContainer = new PIXI.Container();
    this.robot = new Robot(this.app, robotContainer);
    this.app.stage.addChild(robotContainer);
  }

  createStickFigure() {
    const container = new PIXI.Container();
    this.stickFigure = new StickFigure(this.app, container, this.keyboard);
    container.position.set(
      this.app.renderer.width / 2,
      this.app.renderer.height / 2
    );
    this.app.stage.addChild(container);
  }

  startAnimationLoop() {
    this.app.ticker.add(() => {
      this.robot.update();
      this.stickFigure.update();
    });
  }
}
