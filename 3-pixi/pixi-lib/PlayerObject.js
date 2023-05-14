import { GameObject } from './GameObject.js';

export class PlayerObject extends GameObject {
  constructor(options = {}) {
    super();
    const { radius, speed, width, height, keyboard, keys } = options;
    this.radius = radius;
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.direction = { x: 0, y: 0 };
    this.position = { x: width / 2, y: height / 2 };

    this.keyboard = keyboard;
    this.keys = keys;
  }

  handleKeyboardInput() {
    const keyboard = this.keyboard;
    const keys = this.keys;
    const direction = this.direction;

    if (keyboard.isKeyDown(keys.left)) {
      direction.x = -1;
    } else if (keyboard.isKeyDown(keys.right)) {
      direction.x = 1;
    } else {
      direction.x = 0;
    }

    if (keyboard.isKeyDown(keys.up)) {
      direction.y = -1;
    } else if (keyboard.isKeyDown(keys.down)) {
      direction.y = 1;
    } else {
      direction.y = 0;
    }
  }

  update(deltaTime) {
    this.handleKeyboardInput();

    const velocity = {
      x: this.direction.x * this.speed * deltaTime,
      y: this.direction.y * this.speed * deltaTime,
    };
    this.position.x += velocity.x;
    this.position.y += velocity.y;
  }

  draw(stage) {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x00ff00);
    graphics.drawCircle(this.position.x, this.position.y, this.radius);
    graphics.endFill();
    stage.addChild(graphics);
    this.drawVectors(stage);
  }

  drawVectors(stage) {
    const positionGraphics = new PIXI.Graphics();
    positionGraphics.beginFill(0xff0000); // Red color for position
    positionGraphics.drawCircle(0, 0, 4);
    positionGraphics.endFill();
    positionGraphics.x = this.position.x;
    positionGraphics.y = this.position.y;
    stage.addChild(positionGraphics);

    const directionGraphics = new PIXI.Graphics();
    directionGraphics.lineStyle(2, 0x0000ff); // Blue color for direction
    directionGraphics.moveTo(this.position.x, this.position.y);
    const directionX = this.direction.x * (this.radius / 2);
    const directionY = this.direction.y * (this.radius / 2);
    directionGraphics.lineTo(
      this.position.x + directionX,
      this.position.y + directionY
    );
    stage.addChild(directionGraphics);
  }
}
