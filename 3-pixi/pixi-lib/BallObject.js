/* eslint-disable no-undef */
import { GameObject } from './GameObject.js';

export class BallObject extends GameObject {
  constructor(options = {}) {
    super();
    const { id, radius, speed, width, height, keyboard, keys, color, isBall } =
      options;
    this.id = id;
    this.radius = radius;
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.direction = { x: 0, y: 0 };
    this.position = { x: width / 2, y: height / 2 };
    this.keyboard = keyboard;
    this.keys = keys;
    this.color = color;
    this.isBall = isBall;
    this.velocity = { x: 0, y: 0 };
  }

  setPosition(newPosition) {
    this.position.x = newPosition.x;
    this.position.y = newPosition.y;
  }

  setVelocity(newVelocity) {
    this.velocity.x = newVelocity.x;
    this.velocity.y = newVelocity.y;
  }

  setDirection(newDirection) {
    this.direction.x = newDirection.x;
    this.direction.y = newDirection.y;
  }

  emitPossition() {
    if (this.velocity.x > 0 || this.velocity.y > 0)
      this.client.socket.emit('movement', {
        clientId: this.client.clientId,
        newPosition: this.position,
      });
  }

  update(deltaTime) {
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
    this.emitPossition();
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

  checkCircularCollision(obj1, obj2) {
    const distanceX = obj1.position.x - obj2.position.x;
    const distanceY = obj1.position.y - obj2.position.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < obj1.radius + obj2.radius) {
      // Collision detected
      return true;
    }

    // No collision
    return false;
  }

  handleCollisions(gameObject) {
    if (!this.checkCircularCollision(this, gameObject)) return;
    gameObject.kickBall(this);
    console.log('kick');
  }
}
