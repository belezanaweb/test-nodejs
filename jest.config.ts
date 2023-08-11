import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.ts'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'test-config',
    'interfaces',
    'jestGlobalMocks.ts',
    '.module.ts',
    '<rootDir>/src/web/errors/error-detail.ts',
    '<rootDir>/src/server.ts',
    '.mock.ts',
    '<rootDir>/src/utils/errors/error-detail.ts',
    '<rootDir>/src/index.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  }
}

export default config
