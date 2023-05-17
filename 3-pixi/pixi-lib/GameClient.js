export class GameClient {
    constructor() {
        this.clientId = null;
        this.playerObjs = [];
        this.players = {};
        this.socket = null;

        this.setupSocketConnection();

        this.players = {};
    }

    setupSocketConnection() {
        const remoteServerURL = 'https://atari-monk-two-players.azurewebsites.net/';

        // eslint-disable-next-line no-undef
        this.socket = io.connect(remoteServerURL);

        this.socket.on('connect', () => {
            console.log('GameClient connected.');
            this.clientId = this.socket.id;
            console.log('ClientId:', this.clientId);
            console.log('this.playerObjs:', this.playerObjs);

            const player = this.playerObjs.find((player) => player.isPlayable);
            if (!player) {
                this.showPlayerSelectionAlert();
            }
            
            player.client = this;
            player.clientId = this.clientId;
            this.players[player.clientId] = player;
        });

        this.socket.on('movement', ({ clientId, newPosition }) => {
            if (newPosition) {
                this.updatePlayerPosition(clientId, newPosition);
            }
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        this.socket.on('clientIdList', (clientIdList) => {
            console.log('Received client ID list:', clientIdList);
            console.log('this.playerObjs:', this.playerObjs);

            const player = this.playerObjs.find((player) => !player.isPlayable);
            console.log('player:', player);

            player.clientId = clientIdList.find((id) => id !== this.clientId);
            this.players[player.clientId] = player;
        });
    }

    showPlayerSelectionAlert() {
        const message = 'Please write ?player=1 or ?player=2 in the address and refresh the browser to select your player. Otherwise, the game is not possible. Select a player other than your friend.';
        alert(message);
    }

    updatePlayerPosition(clientId, newPosition) {
        const player = this.players[clientId];
        if (player) {
            player.setPosition(Object.assign({}, newPosition));
            console.log('Player updated!');
        }
    }

    addPlayerObjs(players) {
        this.playerObjs = players;
    }

    addPlayerObj(player) {
        this.playerObjs.push(player);
    }

    removePlayer(player) {
        delete this.players[player.client.clientId];
    }

    // Other methods and logic for the client can be implemented here
}
