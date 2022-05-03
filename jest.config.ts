import type {Config} from '@jest/types';

// Or async function
export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    testPathIgnorePatterns: ['/node_modules/'],
    collectCoverage: true,
    testRegex: "\\.test\\.ts",
    transform: {
      "^.+\\.ts$": "ts-jest"
    }
  };
};
