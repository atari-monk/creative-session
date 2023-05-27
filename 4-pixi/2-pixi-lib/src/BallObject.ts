import * as PIXI from 'pixi.js';
import { GameObject } from './GameObject.js';

export class BallObject extends GameObject {
  private readonly id: string;
  private readonly radius: number;
  private readonly speed: number;
  private readonly width: number;
  private readonly height: number;
  private readonly keyboard: any; // Replace 'any' with the actual type of 'keyboard'
  private readonly keys: any; // Replace 'any' with the actual type of 'keys'
  private readonly color: any; // Replace 'any' with the actual type of 'color'
  private readonly isBall: boolean;
  private readonly velocity: { x: number; y: number };
  private readonly client: any; // Replace 'any' with the actual type of 'client'
  private position: { x: number; y: number };
  private direction: { x: number; y: number };

  constructor(options: {
    id: string;
    radius: number;
    speed: number;
    width: number;
    height: number;
    keyboard: any;
    keys: any;
    color: any;
    isBall: boolean;
  }) {
    super();
    const { id, radius, speed, width, height, keyboard, keys, color, isBall } =
      options;
    this.id = id;
    this.radius = radius;
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.position = { x: width / 2, y: height / 2 };
    this.direction = { x: 0, y: 0 };
    this.keyboard = keyboard;
    this.keys = keys;
    this.color = color;
    this.isBall = isBall;
    this.velocity = { x: 0, y: 0 };
    this.client = undefined;
  }

  public setPosition(newPosition: { x: number; y: number }): void {
    this.position.x = newPosition.x;
    this.position.y = newPosition.y;
  }

  public setVelocity(newVelocity: { x: number; y: number }): void {
    this.velocity.x = newVelocity.x;
    this.velocity.y = newVelocity.y;
  }

  public getVelocity(): { x: number; y: number } {
    return this.velocity;
  }

  public setDirection(newDirection: { x: number; y: number }): void {
    this.direction.x = newDirection.x;
    this.direction.y = newDirection.y;
  }

  private emitPossition(): void {
    if (this.velocity.x === 0 && this.velocity.y === 0) return;
    //console.log('ballMovement');
    this.client.socket.emit('ballMovement', {
      clientId: this.client.clientId,
      newPosition: this.position,
    });
  }

  public emitVelocity(): void {
    this.client.socket.emit('ballVelocity', {
      clientId: this.client.clientId,
      newVelocity: this.velocity,
    });
  }

  public update(deltaTime: number): void {
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
    this.emitPossition();
  }

  public draw(stage: PIXI.Container): void {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(this.color.player);
    graphics.drawCircle(this.position.x, this.position.y, this.radius);
    graphics.endFill();
    stage.addChild(graphics);
    this.drawVectors(stage);
  }

  private drawVectors(stage: PIXI.Container): void {
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

  private checkCircularCollision(obj1: BallObject, obj2: BallObject): boolean {
    const distanceX = obj1.position.x - obj2.position.x;
    const distanceY = obj1.position.y - obj2.position.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < obj1.radius! + obj2.radius!) {
      //console.log('collision');
      // Collision detected
      return true;
    }

    // No collision
    return false;
  }

  private bounce(): void {
    const currentVelocity = this.getVelocity();
    const reversedVelocity = {
      x: -currentVelocity.x,
      y: -currentVelocity.y,
    };

    this.setVelocity(reversedVelocity);
    this.emitVelocity();
    console.log(this.velocity);
  }

  public handleCollisions(gameObject: any): void {
    if (!this.checkCircularCollision(this, gameObject)) return;

    if (gameObject.direction.x !== 0 || gameObject.direction.y !== 0) {
      gameObject.kickBall(this);
      console.log('kick');

      gameObject.cantBounce = true;
      setTimeout(() => {
        gameObject.cantBounce = false;
      }, 1000);
    }

    if (
      !gameObject.cantBounce &&
      gameObject.direction.x === 0 &&
      gameObject.direction.y === 0
    ) {
      this.bounce();
      console.log('bounce');
    }
  }
}
