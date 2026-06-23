import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    browserName: 'chromium',
    headless: false,
  },
  webServer: {
    command: 'npm start',
    port: 3000,
    reuseExistingServer: true,
  },
});
