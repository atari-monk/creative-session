import { EventEmitter as LibEventEmitter } from 'eventemitter3';
import { injectable } from 'inversify';

@injectable()
export class EventEmitter extends LibEventEmitter {}
