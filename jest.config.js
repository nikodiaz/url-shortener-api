
export default {
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: "node",
};

