export const utils = {
  printMatchingEnvVariableNames(nameToMatch: string): void {
    const matchingNames: string[] = [];

    for (const key in process.env) {
      if (key.includes(nameToMatch)) {
        matchingNames.push(key);
      }
    }

    console.log(`Environment variables that contain ${nameToMatch}:`);
    console.log(matchingNames);
  },
};
