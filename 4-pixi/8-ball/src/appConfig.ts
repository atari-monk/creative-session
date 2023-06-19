import { AppHelperOptions } from 'atari-monk-pixi-lib';

const urlParams = new URLSearchParams(window.location.search);
const playerUrlParam = urlParams.get('player');
if (playerUrlParam !== '1' && playerUrlParam !== '2') {
  throw new Error(
    'Invalid player URL parameter. Please specify either "1" or "2".'
  );
}

type DirectionMap = {
  [key: string]: string;
};

export const keys: DirectionMap = {
  left: 'ArrowLeft',
  right: 'ArrowRight',
  up: 'ArrowUp',
  down: 'ArrowDown',
  a: 'a',
  d: 'd',
  w: 'w',
  s: 's',
};

export const appHelperOptions: AppHelperOptions = {
  width: 800,
  height: 600,
  backgroundColor: 0x000000,
  fullScreen: false,
  canvasId: 'canvas',
};

const green = 0x00ff00;
const blue = 0x0000ff;

export const playerOptions = {
  id: '1',
  playerNr: 1,
  radius: 50,
  speed: 2,
  width: 800,
  height: 600,
  keys: keys,
  color: {
    player: green,
    position: blue,
    direction: blue,
  },
  isPlayable: playerUrlParam === '1',
};

export const playerOptions2 = {
  id: '2',
  playerNr: 2,
  radius: 50,
  speed: 2,
  width: 800,
  height: 600,
  keys: keys,
  color: {
    player: 0xff0000,
    position: 0x0000ff,
    direction: 0x0000ff,
  },
  isPlayable: playerUrlParam === '2',
};

export const ballOptions = {
  id: '3',
  playerNr: 0,
  radius: 20,
  speed: 2,
  color: {
    player: 0xff0000,
    position: 0x0000ff,
    direction: 0x0000ff,
  },
  isBall: true,
  width: 800,
  height: 600,
  keys: undefined,
  isPlayable: false,
  keyboard: undefined,
};
