// ✅ Playwright test runner import
const { test, expect } = require('@playwright/test');

const TestHarness = require('../harness/runner');
const TradePage = require('../pages/tradePage');
const CoordinatorAgent = require('../agents/coordinatorAgent');

test('AI Autonomous Harness — Hyperliquid Trade Flow', async ({ page }) => {

  // 🧠 Initialize core components
  const harness = new TestHarness(page);
  const tradePage = new TradePage(page);
  const agent = new CoordinatorAgent();

  // 🚀 Start Harness
  await harness.start();

  // 🔁 Autonomous multi-agent execution
  await harness.run(agent, tradePage);

  // ✅ Final validation
  expect(await tradePage.isLoaded()).toBeTruthy();

});
