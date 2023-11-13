import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testRegex: '.*\\.test\\.(js?|ts?)$',
  automock: false,
  transform: {
    '^.+\\.(js|ts)$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};

export default config;
