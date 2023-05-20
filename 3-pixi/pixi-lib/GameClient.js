export class GameClient {
  #clientId = null;
  #playerObjs = [];
  #players = {};
  #socket = null;

  constructor() {
    this.#setupSocketConnection();
    this.#players = {};
  }

  #setupSocketConnection(isInDevEnv = true) {
    // eslint-disable-next-line no-undef
    this.#socket = io.connect(
      isInDevEnv
        ? 'http://localhost:3000'
        : 'https://atari-monk-two-players.azurewebsites.net/'
    );
    this.#socket.on('connect', this.#handleConnect);
    this.#socket.on('movement', this.#handleMovement);
    this.#socket.on('disconnect', this.#handleDisconnect);
    this.#socket.on('clientIdList', this.#handleClientIdList);
  }

  #handleConnect = () => {
    try {
      this.#clientId = this.#socket.id;
      const playablePlayer = this.#playerObjs.find(
        (player) => player.isPlayable
      );

      if (!playablePlayer) {
        this.#noPlayablePlayerError();
        return;
      }

      playablePlayer.client = this;
      playablePlayer.clientId = this.#clientId;
      this.#players[this.#clientId] = playablePlayer;

      console.log('Connected to server', this.#clientId);
    } catch (err) {
      console.error('Connection error:', err.message);
      // Perform error handling, display error message to the user, etc.
    }
  };

  #handleMovement = ({ clientId, newPosition }) => {
    if (!clientId) throw new Error('No clientId data!');
    if (!newPosition) throw new Error('No possition data!');
    this.#updatePlayerPosition(clientId, newPosition);
  };

  #handleDisconnect = () => {
    console.log('Disconnected from server');
  };

  #handleClientIdList = (clientIdList) => {
    const newClinetId = clientIdList.find((id) => id !== this.#clientId);
    if (!newClinetId) return;
    const player = this.#playerObjs.find((player) => !player.isPlayable);
    if (!player) throw new Error('No second player!');
    player.clientId = clientIdList.find((id) => id !== this.#clientId);
    this.#players[newClinetId] = player;
    console.log('New player connected', newClinetId);
    //console.log('Received client ID list:', clientIdList);
    //console.log('this.#playerObjs:', this.#playerObjs);

    //console.log('player:', player);

    //if (!player.clientId) throw new Error('No player clientId in list event!');
    //console.log('players state:', this.#players);
  };

  #noPlayablePlayerError() {
    const message =
      'Please write ?player=1 or ?player=2 in the address and refresh the browser to select your player. Otherwise, the game is not possible. Select a player other than your friend.';
    throw new Error(message);
  }

  #updatePlayerPosition(clientId, newPosition) {
    const player = this.#players[clientId];
    if (!player) {
      console.log(this.#players, clientId);
      throw new Error('No player with this ID!');
    }
    player.setPosition(Object.assign({}, newPosition));
    console.log('Player updated!');
  }

  addPlayerObjs(players) {
    this.#playerObjs = players;
  }

  addPlayerObj(player) {
    this.#playerObjs.push(player);
  }

  removePlayer(player) {
    delete this.#players[player.client.clientId];
  }

  get socket() {
    return this.#socket;
  }
}
