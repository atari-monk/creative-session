import { AppFactory } from './AppFactory.js';

const urlParams = new URLSearchParams(window.location.search);
const playerUrlParam = urlParams.get('player');
console.log(playerUrlParam);
AppFactory.createAndRunApp(
  'mainCanvasId',
  0x000000,
  800,
  600,
  true,
  true,
  Number(playerUrlParam)
);
