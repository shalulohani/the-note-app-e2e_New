// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testMatch: ['**/tests/**/*.spec.js'],

  webServer: {
    command: 'npm start',
    url: 'http://localhost:3001', // ✅ matches your actual running port
    reuseExistingServer: !process.env.CI,
    timeout: 120000 // wait up to 2 minutes for the server to start
  }
});
