async function resolveIntent(intent, tradePage) {

  console.log("[INTENT] Resolving:", intent.type);

  switch (intent.type) {

    case "NAVIGATE":
      console.log("🌐 Opening Hyperliquid trade page...");
      await tradePage.openTrade();
      await tradePage.waitForMarket();
      break;

    case "CHECK_WALLET":
      await tradePage.clickConnectWalletIfVisible();
      break;

    case "DONE":
      console.log("[INTENT] Flow complete");
      break;

    default:
      console.log("[INTENT] Unknown intent:", intent.type);
  }
}

module.exports = { resolveIntent };
