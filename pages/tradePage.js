class TradePage {

  constructor(page) {
    this.page = page;
  }

  async openTrade() {
    console.log("🌐 Opening Hyperliquid trade page...");
    await this.page.goto("https://app.hyperliquid-testnet.xyz/trade", {
      waitUntil: "domcontentloaded"
    });
  }

  // ⭐⭐⭐ ENTERPRISE FIX FOR REALTIME TRADING APPS ⭐⭐⭐
  // ❌ NEVER USE networkidle on websocket apps
  // ✔ Wait for stable UI anchors instead
  async waitForMarket() {

    console.log("📊 Waiting for market UI...");

    // Ensure correct URL first
    await this.page.waitForURL(/trade/, { timeout: 15000 });

    // Wait for Connect button (stable anchor)
    await this.page
      .getByRole('button', { name: /connect/i })
      .first()
      .waitFor({ state: 'visible', timeout: 15000 });

    // Wait for TradingView iframe (chart ready)
    const frame = this.page.frameLocator('iframe').first();

    await frame.locator('body')
      .waitFor({ state: 'visible', timeout: 15000 });

    console.log("✅ Market UI ready");
  }

  // ⭐ SELF HEALING CONNECT CLICK
  async clickConnectWalletIfVisible() {

    console.log('🧠 Self-healing click attempt: "Connect"');

    const locator = this.page
      .getByRole('button', { name: /connect/i })
      .first();

    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      await locator.click({ timeout: 5000 });
      console.log("✅ Click success using semantic strategy");
    } catch {
      console.log("⚠️ Element not found with self-healing");
    }
  }

  async isLoaded() {
    return await this.page.locator('body').isVisible();
  }

  // ⭐ Chart visibility check (iframe-safe)
  async isChartVisible() {
    try {
      const frame = this.page.frameLocator('iframe').first();
      const chart = frame.locator('canvas').first();
      return await chart.isVisible({ timeout: 3000 }).catch(() => false);
    } catch {
      return false;
    }
  }

  // ⭐ Read price text safely
  async getPriceText() {
    const price = this.page.locator('h1').first();
    if (await price.isVisible().catch(() => false)) {
      return await price.textContent();
    }
    return null;
  }

}

module.exports = TradePage;