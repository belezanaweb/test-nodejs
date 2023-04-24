/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@root/(.*)$': '<rootDir>/src/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@infra/(.*)$': '<rootDir>/src/infra/$1',
    '^@exceptions/(.*)$': '<rootDir>/src/exceptions/$1',
  },
}
