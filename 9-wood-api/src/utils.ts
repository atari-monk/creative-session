export const utils = {
  printMatchingEnvVariableNames(valueToMatch: string): void {
    const matchingNames: string[] = [];

    for (const key in process.env) {
      if (process.env[key] === valueToMatch) {
        matchingNames.push(key);
      }
    }

    console.log(`Environment variables that contain ${valueToMatch}:`);
    console.log(matchingNames);
  },
};
