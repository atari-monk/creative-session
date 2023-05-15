import { GameObject } from './GameObject.js';

export class PlayerObject extends GameObject {
  constructor(options = {}) {
    super();
    const { radius, speed, width, height, keyboard, keys, color, client } =
      options;
    this.radius = radius;
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.direction = { x: 0, y: 0 };
    this.position = { x: width / 2, y: height / 2 };
    this.keyboard = keyboard;
    this.keys = keys;
    this.color = color;
    this.client = client;
  }

  setPosition(newPosition) {
    this.position = newPosition;
  }

  handleKeyboardInput() {
    const keyboard = this.keyboard;
    const keys = this.keys;
    const direction = { x: 0, y: 0 };

    if (keyboard.isKeyDown(keys.left) || keyboard.isKeyDown(keys.a)) {
      direction.x -= 1;
    }

    if (keyboard.isKeyDown(keys.right) || keyboard.isKeyDown(keys.d)) {
      direction.x += 1;
    }

    if (keyboard.isKeyDown(keys.up) || keyboard.isKeyDown(keys.w)) {
      direction.y -= 1;
    }

    if (keyboard.isKeyDown(keys.down) || keyboard.isKeyDown(keys.s)) {
      direction.y += 1;
    }

    const length = Math.sqrt(
      direction.x * direction.x + direction.y * direction.y
    );
    if (length !== 0) {
      direction.x /= length;
      direction.y /= length;
    }

    const newPosition = {
      x: this.position.x + direction.x * this.speed,
      y: this.position.y + direction.y * this.speed,
    };

    // Compare the new position with the current position
    if (
      newPosition.x !== this.position.x ||
      newPosition.y !== this.position.y
    ) {
      this.position = newPosition;
      this.client.socket.emit('movement', {
        clientId: this.client.clientId,
        newPosition: this.position,
      });
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
