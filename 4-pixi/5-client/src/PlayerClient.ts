import { Socket, connect } from 'socket.io-client';
import { EventEmitter } from 'eventemitter3';
import { VectorData } from '../../2-pixi-lib/dist/VectorData.js';
import { PlayerObject } from '../../2-pixi-lib/dist/PlayerObject.js';
import { SocketErrorHandler } from './SocketErrorHandler.js';

export class PlayerClient {
  private _playerObjs: PlayerObject[] = [];
  private _players: { [key: string]: PlayerObject } = {};
  protected readonly socketConnection: SocketErrorHandler;
  protected clientId?: string;
  protected readonly _emitter: EventEmitter;

  constructor(socketConnection: SocketErrorHandler, emitter: EventEmitter) {
    this.socketConnection = socketConnection;
    this._emitter = emitter;
    const positionEventKey = 'positionUpdate';
    this._emitter.on(positionEventKey, this.emittPlayerPosition.bind(this));
    this.setupSocketEventHandlers();
  }

  private emittPlayerPosition(data: VectorData) {
    this.socketConnection.socket.emit('movement', data);
  }

  protected setupSocketEventHandlers() {
    const socket = this.socketConnection.socket;
    socket.on('connect', this.handleConnect.bind(this));
    socket.on('movement', this.handleMovement.bind(this));
    socket.on('disconnect', this.handleDisconnect.bind(this));
    socket.on('clientIdList', this.handleClientIdList.bind(this));
    socket.on('connect_error', this.handleConnectError.bind(this));
  }

  private handleConnect() {
    try {
      this.clientId = this.socketConnection.socket.id;
      const playablePlayer = this._playerObjs.find(
        (player) => player.isPlayable
      );

      if (!playablePlayer) {
        this.noPlayablePlayerError();
        return;
      }

      //playablePlayer.client = this;
      playablePlayer.clientId = this.clientId;
      this._players[this.clientId] = playablePlayer;

      console.log(`Connected to server, id: ${this.clientId}`);
    } catch (err) {
      console.error('Connection error:', (err as Error).message);
    }
  }

  private handleMovement(data: VectorData) {
    if (!data.clientId) throw new Error('No clientId data!');
    if (!data.newVector) throw new Error('No position data!');
    this.updatePlayerPosition(data.clientId, data.newVector);
  }

  private handleDisconnect() {
    console.log('Disconnected from server');
  }

  private handleClientIdList(clientIdList: string[]) {
    const newClientId = clientIdList.find((id) => id !== this.clientId);
    if (!newClientId) return;
    const player = this._playerObjs.find((player) => !player.isPlayable);
    if (!player) throw new Error('No second player!');
    player.clientId = clientIdList.find((id) => id !== this.clientId);
    this._players[newClientId] = player;
    console.log(`New player connected, id: ${newClientId}'`);
  }

  private handleConnectError(error: Error) {
    console.error('Connection error:', error.message);
  }

  private noPlayablePlayerError() {
    const message =
      'Please write ?player=1 or ?player=2 in the address and refresh the browser to select your player. Otherwise, the game is not possible. Select a player other than your friend.';
    throw new Error(message);
  }

  private updatePlayerPosition(
    clientId: string,
    newPosition: { x: number; y: number }
  ) {
    const player = this._players[clientId];
    if (!player) {
      throw new Error(`No player with id: ${clientId}`);
    }
    //console.log('1 this should be newPosition', newPosition);
    player.position = newPosition;
  }

  public addPlayerObjs(players: PlayerObject[]) {
    this._playerObjs = players;
  }

  public addPlayerObj(player: PlayerObject) {
    this._playerObjs.push(player);
  }

  public removePlayer(player: any) {
    delete this._players[player.client.clientId];
  }

  // public getSocket(): Socket | undefined {
  //   return this._socket;
  // }

  get socket(): Socket {
    return this.socketConnection.socket;
  }
}
