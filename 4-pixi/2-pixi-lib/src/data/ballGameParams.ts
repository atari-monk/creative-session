import { Vector2d } from '../model/Vector2d';
import { IBallParams } from './interfaces/IBallParams';
import { IPlayerNpcParams } from './interfaces/IPlayerNpcParams';
import { IPlayerParams } from './interfaces/IPlayerParams';
import { IKeys } from './interfaces/IKeys';
import { IScreenSize } from './interfaces/IScreenSize';
import { IAppHelperOptions } from './interfaces/IAppHelperOptions';
import { createColorOptions } from './interfaces/IColorOptions';

const green = 0x00ff00;
const blue = 0x0000ff;
const red = 0xff0000;

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

export const playerNpcParams: IPlayerNpcParams = {
  position: new Vector2d(
    screenSize.width / 2 + (playerUrlParam === '1' ? 250 : -250),
    screenSize.height / 2
  ),
  radius: 50,
  colors: createColorOptions(blue, red, red),
  toString() {
    return `Params: ${this.position.toString('position')}, radius: ${
      this.radius
    }, ${this.colors.toString()}`;
  },
};

export const playerParams: IPlayerParams = {
  position: new Vector2d(
    screenSize.width / 2 + (playerUrlParam === '1' ? -250 : 250),
    screenSize.height / 2
  ),
  direction: new Vector2d(0, 0),
  speed: 2,
  radius: 50,
  screenSize,
  keys,
  colors: createColorOptions(green, blue, blue),
};

export const ballParams: IBallParams = {
  position: new Vector2d(screenSize.width / 2, screenSize.height / 2),
  velocity: new Vector2d(0, 0),
  radius: 20,
  colors: createColorOptions(red, blue, blue),
  toString() {
    return `Params: ${this.position.toString(
      'position'
    )}, ${this.velocity.toString('velocity')} radius: ${
      this.radius
    }, ${this.colors.toString()}`;
  },
};
