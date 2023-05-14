import { GameObject } from './GameObject.js';

export class PlayerObject extends GameObject {
  constructor(options = {}) {
    super();
    const { radius, speed, width, height, keyboard, keys, color } = options;
    this.radius = radius;
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.direction = { x: 0, y: 0 };
    this.position = { x: width / 2, y: height / 2 };
    this.keyboard = keyboard;
    this.keys = keys;
    this.color = color;
  }

  handleKeyboardInput() {
    const keyboard = this.keyboard;
    const keys = this.keys;
    const direction = { x: 0, y: 0 };

    if (keyboard.isKeyDown(keys.left)) {
      direction.x -= 1;
    }

    if (keyboard.isKeyDown(keys.right)) {
      direction.x += 1;
    }

    if (keyboard.isKeyDown(keys.up)) {
      direction.y -= 1;
    }

    if (keyboard.isKeyDown(keys.down)) {
      direction.y += 1;
    }

    const length = Math.sqrt(
      direction.x * direction.x + direction.y * direction.y
    );
    if (length !== 0) {
      direction.x /= length;
      direction.y /= length;
    }

    this.direction = direction;
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
    graphics.beginFill(this.color.player);
    graphics.drawCircle(this.position.x, this.position.y, this.radius);
    graphics.endFill();
    stage.addChild(graphics);
    this.drawVectors(stage);
  }

  drawVectors(stage) {
    const positionGraphics = new PIXI.Graphics();
    positionGraphics.beginFill(this.color.position);
    positionGraphics.drawCircle(0, 0, 4);
    positionGraphics.endFill();
    positionGraphics.x = this.position.x;
    positionGraphics.y = this.position.y;
    stage.addChild(positionGraphics);

    const directionGraphics = new PIXI.Graphics();
    directionGraphics.lineStyle(2, this.color.direction);
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
