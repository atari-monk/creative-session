import { Game } from "./Game.js";
import { Player } from "./Player.js";
import { Spear } from "./Spear.js"
import { Keyboard } from "./Keyboard.js";

const canvas = document.getElementById("game-canvas");
const keyboard = new Keyboard();
const game = new Game(canvas, keyboard);
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
game.addEntity(player);
game.addEntity(spear);