import { GameObject } from './GameObject.js';

export class CircleObject extends GameObject {
  constructor(options = {}) {
    super();
    const { radius, speed, width, height } = options;
    this.radius = radius;
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.direction = { x: 0, y: 0 };
    this.position = { x: width / 2, y: height / 2 };
  }

  draw(stage) {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xff0000);
    graphics.drawCircle(this.position.x, this.position.y, this.radius);
    graphics.endFill();
    stage.addChild(graphics);
  }

  update(deltaTime) {
    const velocity = {
      x: this.direction.x * this.speed * deltaTime,
      y: this.direction.y * this.speed * deltaTime,
    };
    this.position.x += velocity.x;
    this.position.y += velocity.y;

    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;
    if (this.position.x > halfWidth + this.radius) {
      this.position.x = -halfWidth - this.radius;
    } else if (this.position.x < -halfWidth - this.radius) {
      this.position.x = halfWidth + this.radius;
    }
    if (this.position.y > halfHeight + this.radius) {
      this.position.y = -halfHeight - this.radius;
    } else if (this.position.y < -halfHeight - this.radius) {
      this.position.y = halfHeight + this.radius;
    }
  }
}
