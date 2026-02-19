const { resolveIntent } = require('../utils/intentResolver');

class TestHarness {

  constructor(page) {
    this.page = page;
  }

  async start() {

    console.log("🚀 Harness started");

    this.page.on('websocket', ws => {

      console.log("📡 WebSocket observer started");
      console.log("🔌 WebSocket connected:", ws.url());

      ws.on('framereceived', () => {
        console.log("📥 WS Frame received");
      });

      ws.on('close', () => {
        console.log("🔌 WebSocket closed");
      });
    });
  }

  async run(agent, tradePage) {

    while (true) {

      const intent = await agent.decide(this.page);

      console.log("⚡ Executing intent:", intent.type);

      // ⭐ Only intentResolver handles actions
      await resolveIntent(intent, tradePage);

      if (intent.type === "DONE") {
        console.log("🧠 Brain signaled DONE — stopping loop");
        break;
      }
    }

    console.log("✅ Scenario complete");
  }
}

module.exports = TestHarness;
