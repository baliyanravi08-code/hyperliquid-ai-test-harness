// utils/intentResolver.js

async function waitForTradeUI(page) {
  await page.getByText('Available to Trade').waitFor({ timeout: 20000 });
}

async function resolveIntent(intent, page) {

  if (!intent || !intent.type) {
    console.log("[INTENT] Invalid intent received");
    return;
  }

  console.log("[INTENT] Resolving:", intent.type);

  try {

    switch (intent.type) {

      case "OPEN_TRADE_PANEL": {

        console.log("[INTENT V4] Checking current URL:", page.url());

        await page.waitForLoadState('domcontentloaded');

        if (!page.url().includes('/trade')) {

          console.log("[INTENT V4] Navigating to Trade page...");

          const tradeButton =
            page.getByRole('link', { name: 'Trade' })
              .or(page.locator('a[href="/trade"]'))
              .or(page.locator('text=/^Trade$/i').first());

          await tradeButton.first().click({ timeout: 30000 });
        } else {
          console.log("[INTENT V4] Already on Trade page — skip click");
        }

        await waitForTradeUI(page);

        console.log("[INTENT V4] Trade UI verified");
        break;
      }

      case "PLACE_ORDER": {

        console.log("[INTENT V4] Attempting order interaction...");

        const buyButton =
          page.getByRole('button', { name: /buy/i })
            .or(page.locator('text=/^Buy$/i').first());

        await buyButton.first().click({ timeout: 30000 });

        console.log("[INTENT V4] Order interaction executed");
        break;
      }

      // ⭐ NEW — WAIT support
      case "WAIT": {
        return;
      }

      case "DONE": {
        console.log("[INTENT] Flow complete");
        return;
      }

      default: {
        console.log("[INTENT] Unknown intent:", intent.type);
      }
    }

  } catch (err) {
    console.log("[INTENT V4] Execution failed:", err.message);
    throw err;
  }
}

module.exports = { resolveIntent };