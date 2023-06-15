import { IFileData } from './IFileData';
import { IFilesData } from './IFilesData';

export class FilePathParser {
  constructor(private readonly rootPath: string) {}

  parseFilePaths(filePaths: string[]): IFilesData {
    const filesData: IFileData[] = [];

    for (const filePath of filePaths) {
      const { folder, name } = this.parseFilePath(filePath);
      const parsedName = name.replace('.ts', '');
      const parsedFolder = folder.replace(this.rootPath, '').replace(/\\/g, "");
      filesData.push({ name: parsedName, folder: parsedFolder });
    }

    return { root: this.rootPath, files: filesData };
  }

  private parseFilePath(filePath: string): IFileData {
    const filePathWithoutRoot = filePath.replace(this.rootPath, '');
    const pathSegments = filePathWithoutRoot.split('\\');
    const fileName = pathSegments.pop();
    const folder = pathSegments.join('\\');

    return { name: fileName || '', folder: folder || '' };
  }
}
