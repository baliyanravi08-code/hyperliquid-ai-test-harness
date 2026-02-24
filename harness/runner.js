// harness/runner.js

const { resolveIntent } = require('../utils/intentResolver');

class TestHarness {

  constructor(page) {
    this.page = page;
    this.wsHandler = null;
    this.frameHandler = null;
    this.executionLog = []; // ⭐ health tracking
  }

  // ⭐ START HARNESS
  async start() {

    console.log("🚀 Harness started");

    this.wsHandler = (ws) => {

      console.log("📡 WebSocket observer started");
      console.log("🔌 WebSocket connected:", ws.url());

      // ⭐ expose WS readiness to planner
      this.frameHandler = () => {
        console.log("📥 WS Frame received");
        this.page.__WS_READY__ = true;
      };

      ws.on('framereceived', this.frameHandler);

      ws.on('close', () => {
        console.log("🔌 WebSocket closed");
      });
    };

    this.page.on('websocket', this.wsHandler);
  }

  // ⭐ RUN LOOP
  async run(agent, tradePage) {

    console.log("🧪 Agent received:", agent?.constructor?.name);

    if (!agent || typeof agent.decide !== "function") {
      throw new Error("❌ Invalid agent passed — decide() not found");
    }

    while (true) {

      const intent = await agent.decide(this.page);

      console.log("⚡ Executing intent:", intent.type);

      await resolveIntent(intent, tradePage);

      // ⭐ store executed intents
      this.executionLog.push(intent.type);

      // ⭐ WAIT support (Planner V4)
      if (intent.type === "WAIT") {
        await this.page.waitForTimeout(800);
        continue;
      }

      if (intent.type === "DONE") {
        console.log("🧠 Brain signaled DONE — stopping loop");
        break;
      }
    }

    console.log("✅ Scenario complete");

    // ⭐ HEALTH SUMMARY (FINAL STATUS)
    const healthy =
      this.executionLog.includes("OPEN_TRADE_PANEL") &&
      this.executionLog.includes("PLACE_ORDER") &&
      this.executionLog.includes("DONE");

    if (healthy) {
      console.log("🟢 ✅ Hyperliquid UI HEALTHY");
    } else {
      console.log("🔴 ❌ UI REGRESSION DETECTED");
    }

    await this.stop();
  }

  // ⭐ STOP HARNESS
  async stop() {

    console.log("🛑 Stopping Harness observers...");

    if (this.wsHandler) {
      this.page.off('websocket', this.wsHandler);
      this.wsHandler = null;
    }
  }
}

module.exports = TestHarness;