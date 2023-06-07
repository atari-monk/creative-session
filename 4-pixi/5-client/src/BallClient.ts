import { EventEmitter } from 'eventemitter3';
import { VectorData } from '../../2-pixi-lib/dist/VectorData.js';
import { SocketErrorHandler } from './SocketErrorHandler.js';

export class BallClient {
  private ballObj: any = null;
  private readonly socketConnection: SocketErrorHandler;
  protected readonly _emitter: EventEmitter;

  constructor(socketConnection: SocketErrorHandler, emitter: EventEmitter) {
    this.socketConnection = socketConnection;
    this._emitter = emitter;
    this.ballObj = null;
    this.socketConnection.socket.on(
      'ballMovement',
      this.handleBallMovement.bind(this)
    );
    this.socketConnection.socket.on(
      'ballVelocity',
      this.handleBallVelocity.bind(this)
    );
    this._emitter.on('ball-pos-upd', this.emittBallPosition.bind(this));
    this._emitter.on('ball-vel-upd', this.emittBallVelocity.bind(this));
  }

  private emittBallPosition(data: VectorData) {
    this.socketConnection.socket.emit('ballMovement', data.newVector);
  }

  private emittBallVelocity(data: VectorData) {
    this.socketConnection.socket.emit('ballVelocity', data.newVector);
  }

  public addBallObj(ball: any) {
    this.ballObj = ball;
  }

  public removeBallObj() {
    this.ballObj = null;
  }

  private handleBallMovement(newPosition: { x: number; y: number }) {
    if (!newPosition) throw new Error('No position data for the ball!');
    this.updateBallPosition(newPosition);
  }

  private updateBallPosition(newPosition: { x: number; y: number }) {
    if (!this.ballObj) {
      throw new Error('No ball object added!');
    }
    this.ballObj.position = newPosition;
  }

  private handleBallVelocity(newVelocity: { x: number; y: number }) {
    if (!newVelocity) throw new Error('No velocity data for the ball!');
    this.updateBallVelocity(newVelocity);
  }

  private updateBallVelocity(newVelocity: { x: number; y: number }) {
    if (!this.ballObj) {
      throw new Error('No ball object added!');
    }
    this.ballObj.velocity = newVelocity;
  }
}
