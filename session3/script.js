import { Overlay } from "./Overlay.js";
import { Canvas } from "./Canvas.js";

const configState = {
  "isTestDrawOn": false
}
const overlay = new Overlay();
const canvas = new Canvas("game-canvas", configState.isTestDrawOn);
