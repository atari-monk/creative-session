/* eslint-disable no-undef */
const { GameServer } = require('./GameServer');

class BallGameServer extends GameServer {
  constructor() {
    super();
    //this._handleClientConnection(this.socket);
  }

  #handleBallMovement(socket) {
    console.log('setup ballMovement');
    socket.on('ballMovement', ({ newPosition }) => {
      socket.broadcast.emit('ballMovement', { newPosition });
      console.log('ballMovement');
    });
  }

  _handleClientConnection(socket) {
    super._handleClientConnection(socket);
    this.#handleBallMovement(socket);
  }
}

module.exports = { BallGameServer };
