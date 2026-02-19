// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

  testDir: './tests',
  timeout: 60000,

  use: {
    headless: false,
    actionTimeout: 10000,
    navigationTimeout: 30000,
    trace: 'on-first-retry'
  },

  projects: [

    // ⭐ Chromium (Primary stable browser)
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // ⭐ Firefox (Stabilized configuration)
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        viewport: { width: 1280, height: 800 },

        // 🧠 Firefox stabilization settings
        actionTimeout: 15000,
        navigationTimeout: 30000,

        // Helps with delayed rendering in Firefox
        launchOptions: {
          slowMo: 50
        }
      },
    },

    // ⭐ Webkit
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    }

  ],
});
