// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

  testDir: './tests',

  timeout: 60000,

  expect: {
    timeout: 10000,
  },

  fullyParallel: true,

  retries: process.env.CI ? 1 : 0,

  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['list'],
    ['html']
  ],

  use: {
    // ⭐ MOST IMPORTANT — FIXES GITHUB ACTIONS
    headless: !!process.env.CI,

    viewport: { width: 1280, height: 800 },

    trace: 'on-first-retry',

    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  projects: [

    // ⭐ Chromium ONLY (MOST STABLE FOR CI)
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // ⭐ OPTIONAL — Firefox (you can keep or remove)
    // If Firefox causes instability, comment this block.
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    // ⭐ OPTIONAL — Webkit
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});