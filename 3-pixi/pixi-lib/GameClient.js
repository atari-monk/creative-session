import { PlayerObject } from './PlayerObject.js';

export class GameClient {
  constructor() {
    // Create the socket and establish a connection
    this.socket = io.connect('http://localhost:3000');

    // Handle successful connection
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Handle player movement event
    this.socket.on('movement', ({ clientId, newPosition }) => {
      console.log(`Player with ID ${clientId} moved to position:`, newPosition);
      // Update player position or perform other actions based on the received movement event
      this.updatePlayerPosition(clientId, newPosition);
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
    // Access the player object based on the clientId
    const player = this.players[clientId];

    if (player) {
      // Update the player's position based on the received newPosition
      player.setPosition(newPosition);
    }
  }

  // Add a player to the client
  addPlayer(player) {
    this.players[player.clientId] = player;
  }

  // Remove a player from the client
  removePlayer(player) {
    delete this.players[player.clientId];
  }

  // Other methods and logic for the client can be implemented here
}
