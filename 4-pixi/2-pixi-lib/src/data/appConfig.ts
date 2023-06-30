import { Vector2d } from '../model/Vector2d';
import { IBallParams } from './IBallParams';
import {
  IScreenSize,
  IAppHelperOptions,
  IKeys,
  IColorOptions,
  IPlayerOptions,
  IBallOptions,
  IPlayerOptionsV2,
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

export const screenSize: IScreenSize = {
  width: 800,
  height: 600,
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
  radius: playerRadius,
  speed: playerSpeed,
  screenSize,
  keys,
  color: greenObj,
  isPlayable: playerUrlParam === '1',
};

export const player2Options: IPlayerOptions = {
  radius: playerRadius,
  speed: playerSpeed,
  screenSize,
  keys,
  color: blueObj,
  isPlayable: playerUrlParam === '2',
};

export const ballOptions: IBallOptions = {
  radius: ballRadius,
  speed: ballSpeed,
  screenSize,
  color: redObj,
  isBall: true,
};

//////////////////////BallGame2

export const SharedTypes = {
  BasicRenderer: Symbol.for('BasicRenderer'),
};

const NotPlayablePlayerId = 'NotPlayablePlayer';
export const NotPlayablePlayerTypes = {
  Player: Symbol.for(NotPlayablePlayerId),
  Id: Symbol.for(NotPlayablePlayerId + 'Id'),
  Playable: Symbol.for(NotPlayablePlayerId + 'Playable'),
  Position: Symbol.for(NotPlayablePlayerId + 'Position'),
  Circle: Symbol.for(NotPlayablePlayerId + 'Circle'),
  Colors: Symbol.for(NotPlayablePlayerId + 'Colors'),
  Drawer: Symbol.for(NotPlayablePlayerId + 'Drawer'),
};

export const rivalColors: IColorOptions = {
  player: blue,
  position: red,
  direction: red,
};

const rivalOffset = playerUrlParam === '1' ? 250 : -250;

export const rivalPlayer = {
  rivalPosition: new Vector2d(
    screenSize.width / 2 + rivalOffset,
    screenSize.height / 2
  ),
  radius: playerRadius,
  rivalColors,
};

const PlayablePlayerId = 'PlayablePlayer';
export const PlayablePlayerTypes = {
  Player: Symbol.for(PlayablePlayerId),
  Id: Symbol.for(PlayablePlayerId + 'Id'),
  Playable: Symbol.for(PlayablePlayerId + 'Playable'),
  Steering: Symbol.for(PlayablePlayerId + 'Steering'),
  Circle: Symbol.for(PlayablePlayerId + 'Circle'),
  Colors: Symbol.for(PlayablePlayerId + 'Colors'),
  Drawer: Symbol.for(PlayablePlayerId + 'Drawer'),
  KeyboardInput: Symbol.for(PlayablePlayerId + 'KeyboardInput'),
  Keys: Symbol.for(PlayablePlayerId + 'Keys'),
  DirectionFromKeyboard: Symbol.for(PlayablePlayerId + 'DirectionFromKeyboard'),
  PositionEmitter: Symbol.for(PlayablePlayerId + 'PositionEmitter'),
  IUpdateablePlayer: Symbol.for(PlayablePlayerId + 'IUpdateablePlayer'),
};

export const playerColors: IColorOptions = {
  player: green,
  position: blue,
  direction: blue,
};

const playerOffset = playerUrlParam === '1' ? -250 : 250;

export const playerParams: IPlayerOptionsV2 = {
  radius: playerRadius,
  speed: playerSpeed,
  screenSize,
  keys,
  color: greenObj,
  isPlayable: true,
  position: new Vector2d(
    screenSize.width / 2 + playerOffset,
    screenSize.height / 2
  ),
  direction: new Vector2d(0, 0),
};

const BallId = 'Ball';
export const BallTypes = {
  Position: Symbol.for(BallId + 'Position'),
  Circle: Symbol.for(BallId + 'Circle'),
};

export const ballParams: IBallParams = {
  position: new Vector2d(
    screenSize.width / 2,
    screenSize.height / 2
  ),
};
