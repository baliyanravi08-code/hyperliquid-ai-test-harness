const { test } = require('@playwright/test');
const TestHarness = require('../harness/runner');
const Agent = require('../agents/agent');

test('AI Autonomous Harness — Hyperliquid Trade Flow', async ({ page }) => {

  // Must open site first
  await page.goto('https://app.hyperliquid.xyz/', {
    waitUntil: 'domcontentloaded'
  });

  const harness = new TestHarness(page);

  await harness.start();

  const agent = new Agent();

  await harness.run(agent, page);
});