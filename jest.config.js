/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  coveragePathIgnorePatterns: ['<rootDir>/src/routes.ts'],
  coverageThreshold: {
    global: {
      lines: 100,
    },
  },
  coverageProvider: 'v8',
};
