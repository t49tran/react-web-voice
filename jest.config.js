// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      tsConfig: '__tests__/tsconfig.json'
    }
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/*.+(ts|tsx|js)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'
  }
};
