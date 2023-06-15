import { IFilesData } from './../IFilesData';
import { IndexFileGenerator } from './../IndexFileGenerator';

const data: IFilesData = {
  root: 'C:\\atari-monk\\Code\\creative-session\\4-pixi\\2-pixi-lib\\src\\',
  files: [
    { name: 'AppHelper.ts', folder: '' },
    { name: 'AppHelperOptions.ts', folder: '' },
    { name: 'BallObject.ts', folder: '' },
    { name: 'BallRenderer.ts', folder: '' },
    { name: 'EventEmitterLogicManager.ts', folder: 'emitter-logic' },
  ],
};
const fileGenerator = new IndexFileGenerator();

const fileContent = fileGenerator.generateIndexFile(data);

console.log(fileContent);
