import * as fs from 'fs';

const projectPaths: { [key: string]: string } = {
  'pixi-lib':
    'C:/atari-monk/Code/creative-session/4-pixi/2-pixi-lib/package.json',
};

const projectName = process.argv[2];

if (!projectName) {
  console.error(
    'Please provide the name of the project as a command-line argument.'
  );
  process.exit(1);
}

const packageJsonPath = projectPaths[projectName];

if (!packageJsonPath) {
  console.error(`Project '${projectName}' not found in the mapping.`);
  process.exit(1);
}

fs.readFile(packageJsonPath, 'utf8', (err, data) => {
  if (err) {
    console.error(
      `Error reading package.json for project '${projectName}':`,
      err
    );
    return;
  }

  const packageJson = JSON.parse(data);

  const currentVersion = packageJson.version;
  const incrementedVersion = incrementVersion(currentVersion);

  packageJson.version = incrementedVersion;

  fs.writeFile(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2),
    'utf8',
    (err) => {
      if (err) {
        console.error(
          `Error writing package.json for project '${projectName}':`,
          err
        );
        return;
      }

      console.log(
        `Version incremented to ${incrementedVersion} for project '${projectName}'.`
      );
    }
  );
});

function incrementVersion(version: string): string {
  const versionParts = version.split('.');
  const lastPart = parseInt(versionParts[versionParts.length - 1]);
  versionParts[versionParts.length - 1] = (lastPart + 1).toString();
  return versionParts.join('.');
}
