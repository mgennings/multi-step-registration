module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
    },
    collectCoverage: true,
    collectCoverageFrom: [
      'src/app/**/*.ts',
      '!src/app/**/*.spec.ts',
      '!src/app/**/index.ts',
      '!**/node_modules/**',
    ],
    coverageReporters: ['text', 'lcov'],
    coverageDirectory: './coverage',
  };
  