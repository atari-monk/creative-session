import { PlayerObject } from './PlayerObject.js';

export class GameClient {
  constructor() {
    this.clientId = null;
    this.players = {};
    // Create the socket and establish a connection
    this.socket = io.connect('http://localhost:3000');

    // Handle successful connection
    this.socket.on('connect', () => {
      this.clientId = this.socket.id;
      console.log('Connected to server');
      this.connectPlayers(this.players);
    });

    // Handle player movement event
    this.socket.on('movement', ({ clientId, newPosition }) => {
      console.log(`Player with ID ${clientId} moved to position:`, newPosition);
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
  }

  // Update player position based on the received movement event
  updatePlayerPosition(clientId, newPosition) {
    console.log('🐶😊');
    // Access the player object based on the clientId
    const player = this.players[clientId];
    console.log(this.players);
    if (player) {
      // Update the player's position based on the received newPosition
      player.setPosition(newPosition);
      console.log('player updated from server!');
    }
  }

  addPlayers(players) {
    this.players = players;
  }

  connectPlayers(players) {
    players.forEach((player) => {
      if (player.client) {
        this.players[player.client.clientId] = player;
      } else {
        console.log(
          'Cannot add player. Client not defined for player:',
          player
        );
      }
    });
  }

  // Remove a player from the client
  removePlayer(player) {
    delete this.players[player.client.clientId];
  }

  // Other methods and logic for the client can be implemented here
}
