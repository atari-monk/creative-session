import { Socket, connect } from 'socket.io-client';
import { EventEmitter } from 'eventemitter3';
import { VectorData } from '../../2-pixi-lib/dist/VectorData.js';
import { SocketErrorHandler } from './SocketErrorHandler.js';
import { IPlayerManager } from './IPlayerManager.js';
import { PlayerSocket } from './PlayerSocket.js';

export class PlayerClient {
  private readonly playerManager: IPlayerManager;
  protected readonly socketConnection: SocketErrorHandler;
  protected clientId?: string;
  protected readonly _emitter: EventEmitter;
  protected readonly playerSocket: PlayerSocket;

  constructor(
    playerManager: IPlayerManager,
    socketConnection: SocketErrorHandler,
    emitter: EventEmitter,
    playerSocket: PlayerSocket
  ) {
    this.playerManager = playerManager;
    this.socketConnection = socketConnection;
    this._emitter = emitter;
    this.playerSocket = playerSocket;
    const positionEventKey = 'positionUpdate';
    this._emitter.on(positionEventKey, this.emittPlayerPosition.bind(this));
    this.playerSocket.setupEventHandlers();
  }

  private emittPlayerPosition(data: VectorData) {
    this.socketConnection.socket.emit('movement', data);
  }

  get socket(): Socket {
    return this.socketConnection.socket;
  }
}
