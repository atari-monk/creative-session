import { Game } from "./Game.js";
import { Player } from "./Player.js";
import { Spear } from "./Spear.js"
import { Keyboard } from "./Keyboard.js";

const game = new Game();
const canvas = game.getCanvas();
const keyboard = new Keyboard();
const player = new Player(
  50,
  canvas.height - 100,
  50,
  50,
  "red",
  canvas,
  keyboard
);
const spear = new Spear(player, canvas);
game.player = player;
game.spear = spear;