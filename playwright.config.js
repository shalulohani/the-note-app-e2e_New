const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e',

  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'off',
    screenshot: 'only-on-failure',
  },

  webServer: {
    command: 'npm start',
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
