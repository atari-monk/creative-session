import * as fs from 'fs';

export class FileSaver {
  saveFile(filePath: string, content: string): void {
    fs.writeFileSync(filePath, content);
  }

  saveArrayToFile(filePath: string, content: string[]): void {
    const fileContent = content.join('\n');
    this.saveFile(filePath, fileContent);
  }
}
