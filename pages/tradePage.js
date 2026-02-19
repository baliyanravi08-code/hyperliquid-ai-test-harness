class TradePage {
  constructor(page) {
    this.page = page;
  }

  async openTrade() {
    console.log("🌐 Opening Hyperliquid trade page...");
    await this.page.goto('https://app.hyperliquid-testnet.xyz/trade');
  }

  async waitForMarket() {
     console.log("📊 Waiting for market UI...");

  await this.page.waitForLoadState('domcontentloaded');

  // 🔥 Allow WebSocket subscription + streaming time
  await this.page.waitForTimeout(5000);
  }

  async clickConnectWalletIfVisible() {
    const walletButton = this.page.locator('text=Connect');
    if (await walletButton.first().isVisible().catch(() => false)) {
      await walletButton.first().click();
    }
  }

  async isLoaded() {
    return this.page.url().includes('trade');
  }
}

// ✅ IMPORTANT — export the class itself
module.exports = TradePage;
