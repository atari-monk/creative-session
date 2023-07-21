import 'reflect-metadata';
import { GameServer } from './GameServer';
import { ICreate } from 'atari-monk-game-api-lib';
import { ServerSimpleFactory } from './simple-factory/ServerSimpleFactory';

const factory: ICreate<GameServer> = new ServerSimpleFactory();
const gameServer: GameServer = factory.create();
gameServer.start();
