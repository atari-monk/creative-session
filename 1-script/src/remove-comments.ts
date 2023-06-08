import * as fs from 'fs';

function removeCommentsFromFile(filePath: string): void {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
      return;
    }

    const lines = data.split('\n');

    const withoutCommentLines = lines.filter((line) => {
      const trimmedLine = line.trim();
      return !(
        trimmedLine.startsWith('//') ||
        trimmedLine.startsWith('/*') ||
        trimmedLine.endsWith('*/')
      );
    });

    const modifiedContent = withoutCommentLines.join('\n');

    fs.writeFile(filePath, modifiedContent, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file: ${err.message}`);
        return;
      }

      console.log('Comments removed successfully.');
    });
  });
}

const filePath = process.argv[2];

if (!filePath) {
  console.error('Please provide a file path as a command-line argument');
  process.exit(1);
}

removeCommentsFromFile(filePath);
