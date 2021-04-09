module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|js)'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.ts*'],
}
