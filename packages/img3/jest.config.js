/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?': '@swc/jest',
    '^.+\\.jsx?': '@swc/jest',
  },
  collectCoverage: true,
};
