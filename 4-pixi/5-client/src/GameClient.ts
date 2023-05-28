import { Socket, connect } from 'socket.io-client';
import { IGameClient } from './IGameClient.js';

export class GameClient implements IGameClient {
  private clientId!: string;
  private playerObjs: any[] = [];
  private players: { [key: string]: any } = {};
  public socket: Socket | null = null;
  private isLogging: boolean;

  constructor() {
    this.setupSocketConnection();
    this.players = {};
    this.isLogging = true;
  }

  private setupSocketConnection(isInDevEnv = true): void {
    this.socket = connect(
      isInDevEnv
        ? 'http://localhost:3000'
        : 'https://atari-monk-two-players.azurewebsites.net/'
    );
    this.socket.on('connect', this.handleConnect);
    this.socket.on('movement', this.handleMovement);
    this.socket.on('disconnect', this.handleDisconnect);
    this.socket.on('clientIdList', this.handleClientIdList);
  }

  private handleConnect = (): void => {
    try {
      this.clientId = this.socket!.id;
      const playablePlayer = this.playerObjs.find(
        (player) => player.isPlayable
      );

      if (!playablePlayer) {
        this.noPlayablePlayerError();
        return;
      }

      playablePlayer.client = this;
      playablePlayer.clientId = this.clientId;
      this.players[this.clientId] = playablePlayer;

      this.log(`Connected to server, id: ${this.clientId}`);
    } catch (err) {
      console.error('Connection error:', (err as Error).message);
    }
  };

  private handleMovement = ({
    clientId,
    newPosition,
  }: {
    clientId: string;
    newPosition: any;
  }): void => {
    if (!clientId) throw new Error('No clientId data!');
    if (!newPosition) throw new Error('No position data!');
    this.updatePlayerPosition(clientId, newPosition);
  };

  private handleDisconnect = (): void => {
    this.log('Disconnected from server');
  };

  private handleClientIdList = (clientIdList: string[]): void => {
    const newClientId = clientIdList.find((id) => id !== this.clientId);
    if (!newClientId) return;
    const player = this.playerObjs.find((player) => !player.isPlayable);
    if (!player) throw new Error('No second player!');
    player.clientId = clientIdList.find((id) => id !== this.clientId);
    this.players[newClientId] = player;
    this.log(`New player connected, id: ${newClientId}'`);
  };

  private noPlayablePlayerError(): void {
    const message =
      'Please write ?player=1 or ?player=2 in the address and refresh the browser to select your player. Otherwise, the game is not possible. Select a player other than your friend.';
    throw new Error(message);
  }

  private updatePlayerPosition(clientId: string, newPosition: any): void {
    const player = this.players[clientId];
    if (!player) {
      throw new Error(`No player with id: ${clientId}`);
    }
    player.setPosition({ ...newPosition });
  }

  private log(message: string): void {
    if (this.isLogging) {
      console.log(message);
    }
  }

  public addPlayerObjs(players: any[]): void {
    this.playerObjs = players;
  }

  public addPlayerObj(player: any): void {
    this.playerObjs.push(player);
  }

  public removePlayer(player: any): void {
    delete this.players[player.client.clientId];
  }

  public getSocket(): Socket | null {
    return this.socket;
  }
}
