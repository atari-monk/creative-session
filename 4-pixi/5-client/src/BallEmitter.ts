import { EventEmitter } from 'eventemitter3';
import { SocketErrorHandler } from './SocketErrorHandler.js';
import { VectorData } from '../../2-pixi-lib/dist/VectorData.js';

export class BallEmitter {
  private readonly socketConnection: SocketErrorHandler;
  protected readonly _emitter: EventEmitter;

  constructor(socketConnection: SocketErrorHandler, emitter: EventEmitter) {
    this.socketConnection = socketConnection;
    this._emitter = emitter;
    this._emitter.on('ball-pos-upd', this.emittBallPosition.bind(this));
    this._emitter.on('ball-vel-upd', this.emittBallVelocity.bind(this));
  }

  private emittBallPosition(data: VectorData) {
    this.socketConnection.socket.emit('ballMovement', data.newVector);
  }

  private emittBallVelocity(data: VectorData) {
    this.socketConnection.socket.emit('ballVelocity', data.newVector);
  }
}