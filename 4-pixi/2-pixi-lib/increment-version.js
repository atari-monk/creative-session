const fs = require('fs');
const { inc, prerelease, parse } = require('semver');

const packageJsonPath = './package.json'; // Update with the actual path to your package.json

try {
  const packageJson = require(packageJsonPath);
  const currentVersion = packageJson.version;

  const releaseType = prerelease(currentVersion) ? 'prerelease' : 'patch'; // Determine the release type based on whether the current version is a pre-release or not

  const newVersion = inc(currentVersion, releaseType);
  packageJson.version = newVersion;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log(`Version incremented from ${currentVersion} to ${newVersion}`);
} catch (error) {
  console.error('Error incrementing version:', error);
  process.exit(1);
}
