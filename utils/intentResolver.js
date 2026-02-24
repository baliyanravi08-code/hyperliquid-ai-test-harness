// utils/intentResolver.js

/**
 * Resolver V4 FINAL (Stable for Hyperliquid current DOM)
 */

async function resolveIntent(intent, page) {

  if (!intent || !intent.type) {
    console.log("[INTENT] Invalid intent received");
    return;
  }

  console.log("[INTENT] Resolving:", intent.type);

  try {

    switch (intent.type) {

      // ⭐ OPEN TRADE PANEL
      case "OPEN_TRADE_PANEL": {

        console.log("[INTENT V4] Checking current URL:", page.url());

        if (!page.url().includes("/trade")) {
          console.log("[INTENT V4] Navigating to Trade page...");
          await page.goto("https://app.hyperliquid.xyz/trade", {
            waitUntil: "domcontentloaded"
          });
        }

        // Wait for trading UI anchor
        await page.locator('text=Order Book').first().waitFor({
          state: "visible",
          timeout: 30000
        });

        console.log("[INTENT V4] Trade UI verified");

        break;
      }


      // ⭐ PLACE ORDER (FIXED FOR YOUR REAL DOM)
      case "PLACE_ORDER": {

        console.log("[INTENT V4] Attempting order interaction...");

        // Directly target BUY tab from real DOM structure
        const buyTab = page.locator('text=/^Buy$/i').first();

        await buyTab.scrollIntoViewIfNeeded();

        // Hyperliquid chart canvas overlays UI → must use force click
        await buyTab.click({
          timeout: 30000,
          force: true
        });

        console.log("[INTENT V4] Order interaction executed");

        break;
      }


      // ⭐ WAIT SUPPORT
      case "WAIT": {
        console.log("[INTENT V4] WAIT state — idle");
        await page.waitForTimeout(800);
        break;
      }


      // ⭐ DONE
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