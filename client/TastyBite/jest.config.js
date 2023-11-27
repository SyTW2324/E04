module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node', '.feature'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)', '**/*.feature'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.feature$': 'jest-cucumber',
  },
};