import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90000,
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    actionTimeout: 30000,
    navigationTimeout: 60000,
  },
  webServer: {
    command: 'npm start',
    port: 3000,
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
  }
});
