import { IVector2d } from '../model/IVector2d';
import { Vector2d } from '../model/Vector2d';
import { IBallParams } from './IBallParams';
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
  body: green,
  position: blue,
  direction: blue,
};

const blueObj: IColorOptions = {
  body: blue,
  position: red,
  direction: red,
};

const redObj: IColorOptions = {
  body: green,
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
  EventEmitter: Symbol.for('EventEmitter'),
};

const PlayerNpcId = 'PlayerNpc';
export const PlayerNpcTypes = {
  Player: Symbol.for(PlayerNpcId),
  Model: Symbol.for(PlayerNpcId + 'Model'),
  Colors: Symbol.for(PlayerNpcId + 'Colors'),
  Renderer: Symbol.for(PlayerNpcId + 'Renderer'),
};

const createColorOptions = (
  bodyColor: number,
  positionColor: number,
  directionColor: number
): IColorOptions => {
  const colorOptions: IColorOptions = {
    body: bodyColor,
    position: positionColor,
    direction: directionColor,
    toString() {
      return `Colors: ${this.body}, ${this.position}, ${this.direction}`;
    },
  };

  return colorOptions;
};

export const playerNpcColors: IColorOptions = createColorOptions(
  blue,
  red,
  red
);

const playerNpcOffset = playerUrlParam === '1' ? 250 : -250;

export interface IPlayerNpcParams {
  position: IVector2d;
  radius: number;
  colors: IColorOptions;
  toString(): string;
}

export const playerNpcParams: IPlayerNpcParams = {
  position: new Vector2d(
    screenSize.width / 2 + playerNpcOffset,
    screenSize.height / 2
  ),
  radius: playerRadius,
  colors: playerNpcColors,
  toString() {
    return `Params: ${this.position.toString('position')}, radius: ${
      this.radius
    }, ${this.colors.toString()}`;
  },
};

const PlayerId = 'Player';
export const PlayerTypes = {
  Player: Symbol.for(PlayerId),
  Model: Symbol.for(PlayerId + 'Model'),
  Renderer: Symbol.for(PlayerId + 'Renderer'),
  KeyboardInput: Symbol.for(PlayerId + 'KeyboardInput'),
  Keys: Symbol.for(PlayerId + 'Keys'),
  DirectionFromKeyboard: Symbol.for(PlayerId + 'DirectionFromKeyboard'),
  PositionEmitter: Symbol.for(PlayerId + 'PositionEmitter'),
  IPlayerUpdater: Symbol.for(PlayerId + 'IPlayerUpdater'),
};

export const playerColors: IColorOptions = createColorOptions(
  green,
  blue,
  blue
);

const playerOffset = playerUrlParam === '1' ? -250 : 250;

export interface IPlayerParams {
  position: IVector2d;
  direction: IVector2d;
  speed: number;
  radius: number;
  screenSize: IScreenSize;
  keys: IKeys;
  colors: IColorOptions;
}

export const playerParams: IPlayerParams = {
  position: new Vector2d(
    screenSize.width / 2 + playerOffset,
    screenSize.height / 2
  ),
  direction: new Vector2d(0, 0),
  speed: playerSpeed,
  radius: playerRadius,
  screenSize,
  keys,
  colors: greenObj,
};

const BallId = 'Ball';
export const BallTypes = {
  Ball: Symbol.for(BallId),
  Model: Symbol.for(BallId + 'Model'),
  Renderer: Symbol.for(BallId + 'Renderer'),
};

export const ballColors: IColorOptions = createColorOptions(red, blue, blue);

export const ballParams: IBallParams = {
  position: new Vector2d(screenSize.width / 2, screenSize.height / 2),
  velocity: new Vector2d(0, 0),
  radius: ballRadius,
  colors: ballColors,
  toString() {
    return `Params: ${this.position.toString(
      'position'
    )}, ${this.velocity.toString('velocity')} radius: ${
      this.radius
    }, ${this.colors.toString()}`;
  },
};
