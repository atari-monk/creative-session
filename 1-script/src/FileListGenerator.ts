import * as fs from 'fs';
import path from 'path';

export class FileListGenerator {
  private fileList: string[];

  constructor() {
    this.fileList = [];
  }

  generateFileList(dirPath: string): string[] {
    this.traverseDirectory(dirPath);
    return this.fileList;
  }

  private traverseDirectory(currentPath: string) {
    const files = fs.readdirSync(currentPath);

    files.forEach((file) => {
      const filePath = path.join(currentPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        this.traverseDirectory(filePath);
      } else if (stat.isFile()) {
        this.fileList.push(filePath);
      }
    });
  }
}
