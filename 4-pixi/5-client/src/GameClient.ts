import { Socket, connect } from 'socket.io-client';
import { EventEmitter } from 'eventemitter3';
import { VectorData } from './../../2-pixi-lib/dist/VectorData.js';
import { PlayerObject } from './../../2-pixi-lib/dist/PlayerObject.js';

export class GameClient {
  protected clientId!: string;
  private playerObjs: PlayerObject[] = [];
  private players: { [key: string]: any } = {};
  public socket: Socket | undefined;
  protected readonly _emitter: EventEmitter;

  constructor(emitter: EventEmitter) {
    this.players = {};
    this.setupSocketConnection();
    this._emitter = emitter;
    this._emitter.on('positionUpdate', this.emittPlayerPosition.bind(this));
  }

  private emittPlayerPosition(data: VectorData) {
    //console.log('0 this should be newPosition', data.newPosition);
    this.socket!.emit('movement', data);
  }

  protected setupSocketConnection(isInDevEnv = true) {
    this.socket = connect(
      isInDevEnv
        ? 'http://localhost:3000'
        : 'https://atari-monk-two-players.azurewebsites.net/'
    );
    this.socket.on('connect', this.handleConnect.bind(this));
    this.socket.on('movement', this.handleMovement.bind(this));
    this.socket.on('disconnect', this.handleDisconnect.bind(this));
    this.socket.on('clientIdList', this.handleClientIdList.bind(this));
    this.socket.on('connect_error', this.handleConnectError.bind(this));
  }

  private handleConnect() {
    try {
      this.clientId = this.socket!.id;
      const playablePlayer = this.playerObjs.find(
        (player) => player.isPlayable
      );

      if (!playablePlayer) {
        this.noPlayablePlayerError();
        return;
      }

      //playablePlayer.client = this;
      playablePlayer.clientId = this.clientId;
      this.players[this.clientId] = playablePlayer;

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
    const player = this.playerObjs.find((player) => !player.isPlayable);
    if (!player) throw new Error('No second player!');
    player.clientId = clientIdList.find((id) => id !== this.clientId);
    this.players[newClientId] = player;
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
    const player = this.players[clientId];
    if (!player) {
      throw new Error(`No player with id: ${clientId}`);
    }
    //console.log('1 this should be newPosition', newPosition);
    player.position = newPosition;
  }

  public addPlayerObjs(players: PlayerObject[]) {
    this.playerObjs = players;
  }

  public addPlayerObj(player: PlayerObject) {
    this.playerObjs.push(player);
  }

  public removePlayer(player: any) {
    delete this.players[player.client.clientId];
  }

  public getSocket(): Socket | undefined {
    return this.socket;
  }
}
