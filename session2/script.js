import { Game } from './Game.js'
import { Player } from './Player.js';

const player = new Player(400, 500, 50, 50, "#FF0000");
const game = new Game(player);
game.start();