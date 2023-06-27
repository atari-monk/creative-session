import {
  BallObject,
  KeyboardInputHandler,
  PositionEmitter,
  IPlayerOptions,
  Vector2d,
  IVector2d,
} from './index';

export class PlayerComputation {
  private _direction: IVector2d;
  private _position: IVector2d;
  private readonly speed: number;

  constructor(
    private readonly keyboard: KeyboardInputHandler,
    private readonly positionEmitter: PositionEmitter,
    private readonly options: IPlayerOptions
  ) {
    this._direction = new Vector2d(0, 0);
    this._position = new Vector2d(
      options.screenSize.width / 2,
      options.screenSize.height / 2
    );
    this.speed = options.speed;
  }

  public get direction() {
    return this._direction;
  }

  public get position() {
    return this._position;
  }

  public set position(newPosition: IVector2d) {
    console.log('new pos', newPosition, 'pos', this._position);
    this._position.x = newPosition.x;
    this._position.y = newPosition.y;
    console.log('new pos', newPosition, 'pos', this._position);
  }

  public handleKeyboardInput(isPlayable: boolean, clientId: string) {
    if (!isPlayable) return;

    const direction = this.keyboard.direction;
    this._direction = direction;
    this.emitMovementEventIfNeeded(clientId);
  }

  private emitMovementEventIfNeeded(clientId: string) {
    const newPosition = new Vector2d(
      this._position.x + this._direction.x * this.speed,
      this._position.y + this._direction.y * this.speed
    );

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

    const velocity = new Vector2d(
      this._direction.x * this.speed * deltaTime,
      this._direction.y * this.speed * deltaTime
    );

    this._position.x += velocity.x;
    this._position.y += velocity.y;
  }

  public kickBall(ball: BallObject) {
    const velocity = new Vector2d(
      this._direction.x * this.speed,
      this._direction.y * this.speed
    );

    ball.velocity = velocity;
    ball.emitVelocity();
  }
}
