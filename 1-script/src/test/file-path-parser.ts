import { FilePathParser } from './../FilePathParser';

const rootPath =
  'C:\\atari-monk\\Code\\creative-session\\4-pixi\\2-pixi-lib\\src\\';

const filePaths = [
  'C:\\atari-monk\\Code\\creative-session\\4-pixi\\2-pixi-lib\\src\\AppHelper.ts',
  'C:\\atari-monk\\Code\\creative-session\\4-pixi\\2-pixi-lib\\src\\AppHelperOptions.ts',
  'C:\\atari-monk\\Code\\creative-session\\4-pixi\\2-pixi-lib\\src\\BallObject.ts',
  'C:\\atari-monk\\Code\\creative-session\\4-pixi\\2-pixi-lib\\src\\BallRenderer.ts',
  'C:\\atari-monk\\Code\\creative-session\\4-pixi\\2-pixi-lib\\src\\emitter-logic\\EventEmitterLogicManager.ts',
];

const parser = new FilePathParser(rootPath);

const data = parser.parseFilePaths(filePaths);

console.log(data);
