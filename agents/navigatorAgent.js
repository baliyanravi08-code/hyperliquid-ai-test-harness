class NavigatorAgent {

  async decide(page) {

    const url = page.url();
    console.log("🧭 NavigatorAgent analyzing URL:", url);

    if (!url.includes("trade")) {
      return { type: "NAVIGATE", target: "TRADE_PAGE" };
    }

    return { type: "DONE" };
  }
}

module.exports = NavigatorAgent;
