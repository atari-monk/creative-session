import { Robot } from './Robot.js';

export class App {
  constructor(canvasId, width, height, backgroundColor) {
    this.canvas = document.getElementById(canvasId);
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;

    this.createApp();
    this.createRobot();
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

  startAnimationLoop() {
    this.app.ticker.add(() => {
      this.robot.update();
    });
  }
}
