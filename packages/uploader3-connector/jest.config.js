/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?': '@swc/jest',
    '^.+\\.jsx?': '@swc/jest',
  },
  testMatch: ['**/src/**/*.spec.tsx', '**/src/**/*.spec.ts'],
  collectCoverage: true,
};
