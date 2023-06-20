import {
  IScreenSize,
  IAppHelperOptions,
  IKeys,
  IColorOptions,
  IPlayerOptions,
  IBallOptions,
} from './configTypes';

const urlParams = new URLSearchParams(window.location.search);
const playerUrlParam = urlParams.get('player');
if (playerUrlParam !== '1' && playerUrlParam !== '2') {
  throw new Error(
    'Invalid player URL parameter. Please specify either "1" or "2".'
  );
}

export const keys: IKeys = {
  left: 'ArrowLeft',
  right: 'ArrowRight',
  up: 'ArrowUp',
  down: 'ArrowDown',
  a: 'a',
  d: 'd',
  w: 'w',
  s: 's',
};

const screenSize: IScreenSize = {
  width: 800,
  height: 600,
};

export const appHelperOptions: IAppHelperOptions = {
  screenSize,
  backgroundColor: 0x000000,
  fullScreen: false,
  canvasId: 'canvas',
};

const green = 0x00ff00;
const blue = 0x0000ff;
const red = 0xff0000;

const greenObj: IColorOptions = {
  player: green,
  position: blue,
  direction: blue,
};

const blueObj: IColorOptions = {
  player: blue,
  position: red,
  direction: red,
};

const redObj: IColorOptions = {
  player: green,
  position: blue,
  direction: blue,
};

export const player1Options: IPlayerOptions = {
  radius: 50,
  speed: 2,
  screenSize,
  keys,
  color: greenObj,
  isPlayable: playerUrlParam === '1',
};

export const player2Options: IPlayerOptions = {
  radius: 50,
  speed: 2,
  screenSize,
  keys,
  color: blueObj,
  isPlayable: playerUrlParam === '2',
};

export const ballOptions: IBallOptions = {
  radius: 20,
  speed: 2,
  screenSize,
  color: redObj,
  isBall: true,
};
