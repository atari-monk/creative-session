import { Game } from "./Game.js";

const canvas = document.getElementById("game-canvas");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const button = document.getElementById("small-button");
const overlay = document.getElementById("overlay");

button.addEventListener("click", () => {
  overlay.style.display = "block";
});

document.addEventListener("click", (event) => {
  if (event.target === overlay || event.target.parentElement === overlay) {
    overlay.style.display = "none";
  }
});

const game = new Game();

document.getElementById("overlay").addEventListener("click", () => {
  if (!game.paused) {
    game.pause();
  } else {
    game.start();
  }
});
