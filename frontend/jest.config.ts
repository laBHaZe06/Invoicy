import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  verbose: true,
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  // Add page test settings
  testMatch: ['<rootDir>/__tests__/**/*.+(ts|tsx)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  // moduleNameMapper: {
  //   '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  // },
  // Add any custom Jest setup steps you need
  // For example, you might want to mock modules like 'react-router-dom'
  // ...
  // If you're using Next.js' Link component, you can add it to the moduleNameMapper
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^next/link$': '<rootDir>/node_modules/next/link',
  },
  //...
  // If you're using Next in your app, you can add it to the moduleNameMapper module name mapper
  // moduleNameMapper: {
  //   '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  //   '^next/link$': '<rootDir>/node_modules/next/link',
  // },
  //...

}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)