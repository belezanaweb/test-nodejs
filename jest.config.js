module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/tests/**/*.test.(ts|js|tsx)'],
  testEnvironment: 'node',
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    './node_modules/',
    './tests/',
    './dist/',
    'src/index.ts',
    './development'
  ],
}
