import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',

  use: {
    headless: true,                     // 🔥 REQUIRED for GitHub Actions
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'off',
    screenshot: 'only-on-failure',
  },

  webServer: {
    command: 'npm start',
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI, // Reuse server locally, fresh server in CI
  },
});
