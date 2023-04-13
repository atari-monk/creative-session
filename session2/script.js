import { Game } from './Game.js'
import { Player } from './Player.js';

const game = new Game();
const canvas = game.getCanvas();
const player = new Player(400, 500, 50, 50, "#FF0000", canvas);
game.player = player;