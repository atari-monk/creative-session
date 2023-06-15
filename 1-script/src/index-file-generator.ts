import { FileListGenerator } from './FileListGenerator';
import { FilePathParser } from './FilePathParser';
import { IndexFileGenerator } from './IndexFileGenerator';
import { FileSaver } from './FileSaver';

const src = 'C:\\atari-monk\\Code\\creative-session\\4-pixi\\2-pixi-lib\\src';
//const src = 'C:\\atari-monk\\Code\\creative-session\\4-pixi\\5-clinet\\src';
const inputDirPath = process.argv[2] ?? src;
const outputFileName = 'index.ts';
const outputFolder = inputDirPath;
const outputFilePath = `${outputFolder}${outputFileName}`;

const fileListGenerator = new FileListGenerator();
const parser = new FilePathParser(inputDirPath);
const fileGenerator = new IndexFileGenerator();
const fileSaver = new FileSaver();

const fileList = fileListGenerator.generateFileList(inputDirPath);
const data = parser.parseFilePaths(fileList);
data.files = data.files.filter((item) => item.name !== 'index');
const fileContent = fileGenerator.generateIndexFile(data);
fileSaver.saveFile(outputFilePath, fileContent);
