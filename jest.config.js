module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/tests/mock.js',
    '@atoms/(.*)': '<rootDir>/src/atoms/$1',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@pages/(.*)': '<rootDir>/src/pages/$1',
    '@templates/(.*)': '<rootDir>/src/templates/$1',
    '@styles/(.*)': '<rootDir>/src/styles/$1',
    '@src/(.*)': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
};
