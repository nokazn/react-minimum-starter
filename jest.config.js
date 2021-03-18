const path = require('path');

/**
 * @param {string} p
 * @returns {string}
 */
const projectRoot = (p) => path.join(__dirname, p);

module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    '^.+\\.(scss|css)$': 'jest-transform-stub'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    projectRoot('**'),
  ],
};
