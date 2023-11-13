const Environment = require('jest-environment-jsdom');

/**
 * A custom environment to set the TextEncoder
 */
const CustomTestEnvironment = class CustomTestEnvironment extends Environment.TestEnvironment {
  async setup() {
    await super.setup();
    const { TextEncoder, TextDecoder } = require('util');
    this.global.TextEncoder = TextEncoder;
    this.global.TextDecoder = TextDecoder;
  }
};

module.exports = CustomTestEnvironment;
