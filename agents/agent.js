// agents/agent.js

/**
 * Planner Agent V4 — Hybrid Autonomous Brain
 * BEST PRACTICAL VERSION for your project
 *
 * Features:
 * - Observer driven
 * - WAIT state (no premature DONE)
 * - Stable deterministic planning
 * - Works with Resolver V4 + Harness fix
 */

class Agent {

  constructor() {
    this.memory = new Set();
    this.stepCount = 0;
    this.maxSteps = 20;
  }

  async decide(page) {

    this.stepCount++;

    console.log("🧠 Planner V4 observing environment...");

    // ⭐ Safety guard (prevents infinite loops)
    if (this.stepCount > this.maxSteps) {
      console.log("🧠 Max steps reached — DONE");
      return { type: "DONE" };
    }

    const url = page.url();

    // ===== OBSERVE STATE =====

    const tradeUIVisible = await page
      .getByText('Available to Trade')
      .isVisible()
      .catch(() => false);

    const connectVisible = await page
      .getByRole('button', { name: /connect/i })
      .isVisible()
      .catch(() => false);

    const wsReady = page.__WS_READY__ === true;

    console.log("🧠 State:", {
      url,
      tradeUIVisible,
      connectVisible,
      wsReady
    });

    // ==========================
    // 🧭 PLANNING LOGIC
    // ==========================

    // PLAN A — Navigate to trade page
    if (!url.includes('/trade') && !this.memory.has("OPEN_TRADE_PANEL")) {

      console.log("🧠 Planner decision → OPEN_TRADE_PANEL");

      this.memory.add("OPEN_TRADE_PANEL");
      return { type: "OPEN_TRADE_PANEL" };
    }

    // PLAN B — Wait until WebSocket market data arrives
    if (!wsReady) {
      console.log("🧠 Waiting for market data (WAIT state)");
      return { type: "WAIT" };
    }

    // PLAN C — Interact only if wallet connected
    if (tradeUIVisible && !connectVisible && !this.memory.has("PLACE_ORDER")) {

      console.log("🧠 Planner decision → PLACE_ORDER");

      this.memory.add("PLACE_ORDER");
      return { type: "PLACE_ORDER" };
    }

    // PLAN D — Goal achieved
    console.log("🧠 Planner goal satisfied — DONE");

    return { type: "DONE" };
  }
}

module.exports = Agent;