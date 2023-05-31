import * as PIXI from 'pixi.js';
import { GameObject } from './GameObject.js';
import { KeyboardInputV1 } from './KeyboardInputV1.js';
import { PlayerObjectOptions } from './PlayerObjectOptions.js';
import { EventEmitter } from 'eventemitter3';

export class PlayerObject extends GameObject {
  private readonly keyboard: KeyboardInputV1;
  private readonly id: string;
  private readonly radius: number;
  private readonly speed: number;
  private readonly width: number;
  private readonly height: number;
  private readonly keys: any; // Replace 'any' with the actual type of 'keys'
  private readonly color: any; // Replace 'any' with the actual type of 'color'
  public readonly isPlayable: boolean;
  private readonly playerNr: number;
  private direction: { x: number; y: number };
  private position: { x: number; y: number };
  private client!: any;
  private clientId: any;
  //todo: this will remove need for client ref soon
  private positionEmitter: EventEmitter;

  constructor(keyboard: KeyboardInputV1, options: PlayerObjectOptions) {
    super();
    this.keyboard = keyboard;
    this.id = options.id;
    this.radius = options.radius;
    this.speed = options.speed;
    this.width = options.width;
    this.height = options.height;
    this.direction = { x: 0, y: 0 };
    this.position = { x: this.width / 2, y: this.height / 2 };
    this.keys = options.keys;
    this.color = options.color;
    this.isPlayable = options.isPlayable;
    this.playerNr = options.playerNr;

    this.positionEmitter = new EventEmitter();
  }

  //todo: use it
  private emitPositionUpdate(): void {
    this.positionEmitter.emit('positionUpdate', {
      clientId: this.clientId,
      newPosition: this.position,
    });
  }

  public setPosition(newPosition: { x: number; y: number }): void {
    this.position = { ...newPosition };
  }

  private handleKeyboardInput(): void {
    if (!this.isPlayable) return;

    const direction = { x: 0, y: 0 };
    const { keys } = this;

    if (this.keyboard.isKeyDown(keys.left) || this.keyboard.isKeyDown(keys.a)) {
      direction.x -= 1;
    }

    if (
      this.keyboard.isKeyDown(keys.right) ||
      this.keyboard.isKeyDown(keys.d)
    ) {
      direction.x += 1;
    }

    if (this.keyboard.isKeyDown(keys.up) || this.keyboard.isKeyDown(keys.w)) {
      direction.y -= 1;
    }

    if (this.keyboard.isKeyDown(keys.down) || this.keyboard.isKeyDown(keys.s)) {
      direction.y += 1;
    }

    const length = Math.sqrt(direction.x ** 2 + direction.y ** 2);
    if (length !== 0) {
      direction.x /= length;
      direction.y /= length;
    }

    this.direction = direction;
    this.emitMovementEventIfNeeded();
  }

  private emitMovementEventIfNeeded(): void {
    const newPosition = {
      x: this.position.x + this.direction.x * this.speed,
      y: this.position.y + this.direction.y * this.speed,
    };

    if (
      this.isPlayable &&
      this.client &&
      this.clientId &&
      (newPosition.x !== this.position.x || newPosition.y !== this.position.y)
    ) {
      this.position = newPosition;
      this.client.socket!.emit('movement', {
        clientId: this.clientId,
        newPosition: this.position,
      });
    }
  }

  public update(deltaTime: number): void {
    this.handleKeyboardInput();

    const velocity = {
      x: this.direction.x * this.speed * deltaTime,
      y: this.direction.y * this.speed * deltaTime,
    };

    this.position.x += velocity.x;
    this.position.y += velocity.y;
  }

  public draw(stage: PIXI.Container): void {
    this.drawPlayerCircle(stage);
    this.drawPositionCircle(stage);
    this.drawDirectionLine(stage);
  }

  private drawPlayerCircle(stage: PIXI.Container): void {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(this.color.player);
    graphics.drawCircle(this.position.x, this.position.y, this.radius);
    graphics.endFill();
    stage.addChild(graphics);
  }

  private drawPositionCircle(stage: PIXI.Container): void {
    const positionGraphics = new PIXI.Graphics();
    positionGraphics.beginFill(this.color.position);
    positionGraphics.drawCircle(0, 0, 4);
    positionGraphics.endFill();
    positionGraphics.x = this.position.x;
    positionGraphics.y = this.position.y;
    stage.addChild(positionGraphics);
  }

  private drawDirectionLine(stage: PIXI.Container): void {
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

  public kickBall(ball: any): void {
    // Replace 'any' with the actual type of 'ball'
    const velocity = {
      x: this.direction.x * this.speed * 2,
      y: this.direction.y * this.speed * 2,
    };

    ball.setVelocity(velocity);
    ball.emitVelocity();
  }
}
