// playwright.config.js
// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    use: {
      baseURL: 'https://polaris-ui.azurewebsites.net',
      //screenshot: 'only-on-failure',
      //trace: 'retain-on-failure',
    },

    timeout: 30000,
    //retries: 2,
    //globalSetup: require.resolve('./global-setup'),
  };
  
  module.exports = config;