import { Overlay } from "./Overlay.js";
import { Canvas } from "./Canvas.js";
import { Animator } from "./Animator.js";
import { GameObject } from "./GameObject.js";

const configState = {
  isTestDrawOn: false,
};
const canvas = new Canvas("game-canvas", configState.isTestDrawOn);
const gameObject = new GameObject(canvas.width / 2, canvas.height / 2);
const animator = new Animator(canvas, gameObject);
const overlay = new Overlay(animator);
//animator.start();