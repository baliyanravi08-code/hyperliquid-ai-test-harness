const NavigatorAgent = require('./navigatorAgent');
const TraderAgent = require('./tradeAgent');
const ValidatorAgent = require('./validatorAgent');

class CoordinatorAgent {

  constructor() {
    this.navigator = new NavigatorAgent();
    this.trader = new TraderAgent();
    this.validator = new ValidatorAgent();

    this.memory = [];
  }

  async decide(page) {

    console.log("🧠 Coordinator memory:", this.memory);

    // 🧭 Navigation comes first
    if (!this.memory.includes("NAVIGATED")) {
      const action = await this.navigator.decide(page);
      this.memory.push("NAVIGATED");
      return action;
    }

    // 💼 Trading actions
    if (!this.memory.includes("CONNECTED")) {
      const action = await this.trader.decide(page);
      this.memory.push("CONNECTED");
      return action;
    }

    // ✅ Validation step
    return await this.validator.decide(page);
  }
}

module.exports = CoordinatorAgent;
