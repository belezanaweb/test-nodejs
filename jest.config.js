module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    'coverage',
    'node_modules',
    'src/container',
    'src/interfaces',
    'src/infra/logging',
    'src/app/application',
    'src/infra/database/models'
  ],
  coverageProvider: 'babel',
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  moduleDirectories: ['node_modules', 'src', '.'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  rootDir: './',
  roots: ['<rootDir>/src', '<rootDir>/test/unit'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/']
};
