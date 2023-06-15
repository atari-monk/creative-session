import { IFilesData } from './IFilesData';

export class IndexFileGenerator {
  generateIndexFile(data: IFilesData): string {
    const { root, files } = data;
    let indexFileContent = '';
    for (const file of files) {
      const filePath = file.folder ? `${file.folder}/${file.name}` : file.name;
      indexFileContent += `export { ${file.name.replace(
        '.ts',
        ''
      )} } from './${filePath}'\n`;
    }
    return indexFileContent;
  }
}
