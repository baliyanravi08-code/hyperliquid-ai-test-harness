class TradeAgent {

  async decide(page) {

    console.log("💼 TraderAgent checking wallet");

    return {
      type: "CHECK_WALLET",
      label: "Connect"
    };
  }
}

module.exports = TradeAgent;
