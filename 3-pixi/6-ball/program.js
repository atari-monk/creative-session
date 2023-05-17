import { AppFactory } from './AppFactory.js';

const urlParams = new URLSearchParams(window.location.search);
const playerUrlParam = urlParams.get('player');

if (playerUrlParam !== '1' && playerUrlParam !== '2') {
  throw new Error(
    // prettier-ignore
    'Invalid player URL parameter. ' + 
    'Please specify either "1" or "2".'
  );
}

const appConfig = {
  canvasId: 'mainCanvasId',
  backgroundColor: 0x000000,
  canvasWidth: 800,
  canvasHeight: 600,
  enableFullscreen: true,
  playerNumber: Number(playerUrlParam),
};

AppFactory.createAndRunApp(appConfig);
