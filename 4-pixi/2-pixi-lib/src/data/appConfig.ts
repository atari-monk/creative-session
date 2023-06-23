import { Vector2d } from '../model/Vector2d';
import {
  IScreenSize,
  IAppHelperOptions,
  IKeys,
  IColorOptions,
  IPlayerOptions,
  IBallOptions,
} from './configTypes';

let playerUrlParam: string | null = '';
try {
  const urlParams = new URLSearchParams(window.location.search);
  playerUrlParam = urlParams.get('player');
  if (playerUrlParam !== '1' && playerUrlParam !== '2') {
    throw new Error(
      'Invalid player URL parameter. Please specify either "1" or "2".'
    );
  }
} catch (error) {
  console.error(
    'Error: Invalid player URL parameter. Defaulting to empty string.'
  );
  playerUrlParam = '';
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

const green = 0x00ff00;
const blue = 0x0000ff;
const red = 0xff0000;
const playerRadius = 50;
const ballRadius = 20;
const ballSpeed = 4;
const playerSpeed = 2;

const screenSize: IScreenSize = {
  width: 800,
  height: 600,
};

export const rivalColors: IColorOptions = {
  player: blue,
  position: red,
  direction: red,
};

export const rivalPlayer = {
  rivalPosition: new Vector2d(
    screenSize.width / 2 + 250,
    screenSize.height / 2
  ),
  radius: playerRadius,
  rivalColors,
};

export const appHelperOptions: IAppHelperOptions = {
  screenSize,
  backgroundColor: 0x000000,
  fullScreen: false,
  canvasId: 'canvas',
};

const greenObj: IColorOptions = {
  player: green,
  position: blue,
  direction: blue,
};

const redObj: IColorOptions = {
  player: green,
  position: blue,
  direction: blue,
};

export const player1Options: IPlayerOptions = {
  radius: playerRadius,
  speed: playerSpeed,
  screenSize,
  keys,
  color: greenObj,
  isPlayable: playerUrlParam === '1',
};

export const player1OptionsV2: IPlayerOptions = {
  radius: playerRadius,
  speed: playerSpeed,
  screenSize,
  keys,
  color: greenObj,
  isPlayable: true,
};

export const player2Options: IPlayerOptions = {
  radius: playerRadius,
  speed: playerSpeed,
  screenSize,
  keys,
  color: rivalColors,
  isPlayable: playerUrlParam === '2',
};

export const ballOptions: IBallOptions = {
  radius: ballRadius,
  speed: ballSpeed,
  screenSize,
  color: redObj,
  isBall: true,
};

export const RivalPlayerTypes = {
  RivalPlayer: Symbol.for('RivalPlayer'),
  rivalPosition: Symbol.for('rivalPosition'),
  rivalCircle: Symbol.for('rivalCircle'),
  BasicRenderer: Symbol.for('BasicRenderer'),
  rivalColors: Symbol.for('rivalColors'),
};
