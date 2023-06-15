import { FileSaver } from './../FileSaver';

const folderPath = 'C:/atari-monk/Code/creative-session/1-script/temp';
const fileName = 'example.txt';
const lines = ['Line 1', 'Line 2', 'Line 3'];

const fileSaver = new FileSaver();

const filePath = `${folderPath}\\${fileName}`;

fileSaver.saveArrayToFile(filePath, lines);
