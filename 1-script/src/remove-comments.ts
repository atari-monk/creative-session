import * as fs from 'fs';

function removeCommentsFromFile(filePath: string): void {
  // Read the file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
      return;
    }

    // Remove single-line comments
    const singleLineCommentsRegex = /\/\/.*$/gm;
    const withoutSingleLineComments = data.replace(singleLineCommentsRegex, '');

    // Remove multi-line comments
    const multiLineCommentsRegex = /\/\*[\s\S]*?\*\//gm;
    const withoutMultiLineComments = withoutSingleLineComments.replace(
      multiLineCommentsRegex,
      ''
    );

    // Print the content without comments
    console.log(withoutMultiLineComments);
  });
}

// Get the file path from the command-line argument
const filePath = process.argv[2];

// Check if a file path was provided
if (!filePath) {
  console.error('Please provide a file path as a command-line argument');
  process.exit(1);
}

// Remove comments from the file
removeCommentsFromFile(filePath);
