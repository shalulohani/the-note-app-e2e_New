// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90000, // 90 seconds per test
  expect: {
    timeout: 10000
  },
  use: {
    headless: true,
    actionTimeout: 30000,
    navigationTimeout: 60000,
    baseURL: 'http://localhost:3001'
  },
  webServer: {
    command: 'npx serve -s build -l 3001',
    port: 3001,
    timeout: 120000, // wait 2 minutes for server to be ready
    reuseExistingServer: !process.env.CI
  }
});
