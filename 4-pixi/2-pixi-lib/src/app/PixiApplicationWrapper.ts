import { injectable } from 'inversify';
import * as PIXI from 'pixi.js';

@injectable()
export class PixiApplicationWrapper extends PIXI.Application<PIXI.ICanvas> {}
