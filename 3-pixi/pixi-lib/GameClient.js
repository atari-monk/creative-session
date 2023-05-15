import { PlayerObject } from './PlayerObject.js';

export class GameClient {
  constructor() {
    this.clientId = null;
    this.playerObjs = [];
    this.players = {};
    // Create the socket and establish a connection
    this.socket = io.connect('http://localhost:3000');

    // Handle successful connection
    this.socket.on('connect', () => {
      this.clientId = this.socket.id;
      console.log('Connected to server');
      const player = this.playerObjs.find((player) => player.isPlayable);
      player.client = this;
      player.clientId = this.clientId;
      this.players[player.clientId] = player;
    });

    // Handle player movement event
    this.socket.on('movement', ({ clientId, newPosition }) => {
      //console.log(`Player with ID ${clientId} moved to position:`, newPosition);
      if (newPosition) {
        // Update player position or perform other actions based on the received movement event
        this.updatePlayerPosition(clientId, newPosition);
      }
    });

    // Handle disconnection
    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Initialize the players object
    this.players = {};

    this.socket.on('clientIdList', (clientIdList) => {
      console.log('Received client ID list:', clientIdList);
      const player = this.playerObjs.find(
        (player) => player.isPlayable === false
      );
      player.clientId = clientIdList.find((id) => id !== this.clientId);
      this.players[player.clientId] = player;
    });
  }

  // Update player position based on the received movement event
  updatePlayerPosition(clientId, newPosition) {
    // Access the player object based on the clientId
    const player = this.players[clientId];
    console.log(
      'clientId: ',
      clientId,
      'newPosition: ',
      newPosition,
      'player: ',
      player,
      'players: ',
      this.players
    );
    if (player) {
      // Update the player's position based on the received newPosition
      player.setPosition(Object.assign({}, newPosition));
      console.log('player updated!');
    }
  }

  addPlayerObjs(players) {
    this.playerObjs = players;
    //console.log('this.playerObjs: ', this.playerObjs);
  }

  // Remove a player from the client
  removePlayer(player) {
    delete this.players[player.client.clientId];
  }

  // Other methods and logic for the client can be implemented here
}
