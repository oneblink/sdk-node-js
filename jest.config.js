module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['<rootDir>/src', 'node_modules'],
  roots: ['.', 'src'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
}
