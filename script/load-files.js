const fs = require("fs");
const path = require("path");

// The directory to read files from
const directoryPath = "../session3";

// The directory to write the output file to
const outputDirectory = "./script";

// The output file name
const outputFile = "output.txt";

// The file extensions to include
const fileExtensions = [".js", ".html", ".css"];

// Read all files in the directory with the given extensions
fs.readdir(directoryPath, (err, files) => {
  if (err) throw err;

  const fileContents = [];

  files.forEach((file) => {
    const fileExt = path.extname(file);
    if (fileExtensions.includes(fileExt)) {
      const filePath = path.join(directoryPath, file);
      const content = fs.readFileSync(filePath, "utf8");
      fileContents.push(content);
    }
  });

  // Write the file contents to the output file
  const outputFilePath = path.join(outputDirectory, outputFile);
  const outputContent = fileContents.join("\n");
  fs.writeFileSync(outputFilePath, outputContent);
});
