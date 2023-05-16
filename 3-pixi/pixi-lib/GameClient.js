import { PlayerObject } from './PlayerObject.js';

export class GameClient {
  constructor() {
    this.clientId = null;
    this.playerObjs = [];
    this.players = {};
    const local = 'http://localhost:3000';
    const remote = 'https://atari-monk-two-players.azurewebsites.net/';
    // Create the socket and establish a connection
    this.socket = io.connect(remote);

    // Handle successful connection
    this.socket.on('connect', () => {
      try {
        console.log('GameClient on connect.');
        this.clientId = this.socket.id;
        console.log('ClientId: ', this.clientId);
        const player = this.playerObjs.find((player) => player.isPlayable);
        if (player === undefined)
          alert(
            'Please write ?player=1 or ?player=2 in address and refresh browser to select your player. Otherwise game is not possible. Select player other that your friend.'
          );
        player.client = this;
        player.clientId = this.clientId;
        this.players[player.clientId] = player;
      } catch (err) {
        console.log(err);
      }
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
      try {
        console.log('Received client ID list:', clientIdList);
        console.log('this.playerObjs:', this.playerObjs);
        const player = this.playerObjs.find(
          (player) => player.isPlayable === false
        );
        console.log('player:', player);
        player.clientId = clientIdList.find((id) => id !== this.clientId);
        this.players[player.clientId] = player;
      } catch (err) {
        console.log(err);
      }
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
