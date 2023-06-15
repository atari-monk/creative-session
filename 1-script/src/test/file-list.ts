import { FileListGenerator } from './../FileListGenerator';

const dirPath =
  process.argv[2] ??
  'C:/atari-monk/Code/creative-session/4-pixi/2-pixi-lib/src';

const fileListGenerator = new FileListGenerator();

const fileList = fileListGenerator.generateFileList(dirPath);

console.log(fileList);
