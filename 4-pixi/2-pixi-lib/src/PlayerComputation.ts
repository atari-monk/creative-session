import {
  BallObject,
  KeyboardInputHandler,
  PositionEmitter,
  IPlayerOptions,
} from './index';

export class PlayerComputation {
  private _direction: { x: number; y: number };
  private _position: { x: number; y: number };
  private readonly speed: number;

  constructor(
    private readonly keyboard: KeyboardInputHandler,
    private readonly positionEmitter: PositionEmitter,
    private readonly options: IPlayerOptions
  ) {
    this._direction = { x: 0, y: 0 };
    this._position = {
      x: options.screenSize.width / 2,
      y: options.screenSize.height / 2,
    };
    this.speed = options.speed;
  }

  public get direction() {
    return this._direction;
  }

  public get position() {
    return this._position;
  }

  public set position(newPosition: { x: number; y: number }) {
    this._position.x = newPosition.x;
    this._position.y = newPosition.y;
  }

  public handleKeyboardInput(isPlayable: boolean, clientId: string) {
    if (!isPlayable) return;

    const direction = this.keyboard.direction;
    this._direction = direction;
    this.emitMovementEventIfNeeded(clientId);
  }

  private emitMovementEventIfNeeded(clientId: string) {
    const newPosition = {
      x: this._position.x + this._direction.x * this.speed,
      y: this._position.y + this._direction.y * this.speed,
    };

    if (
      newPosition.x !== this._position.x ||
      newPosition.y !== this._position.y
    ) {
      this._position = newPosition;
      this.positionEmitter.emitPosition(clientId, newPosition);
    }
  }

  public update(deltaTime: number, clientId: string) {
    this.handleKeyboardInput(this.options.isPlayable, clientId);

    const velocity = {
      x: this._direction.x * this.speed * deltaTime,
      y: this._direction.y * this.speed * deltaTime,
    };

    this._position.x += velocity.x;
    this._position.y += velocity.y;
  }

  public kickBall(ball: BallObject) {
    const velocity = {
      x: this._direction.x * this.speed,
      y: this._direction.y * this.speed,
    };

    ball.velocity = velocity;
    ball.emitVelocity();
  }
}
