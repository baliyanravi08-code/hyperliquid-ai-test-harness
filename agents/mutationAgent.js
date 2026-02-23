class MutationAgent {

  constructor() {
    this.lastMutation = Date.now();
  }

  async start(page) {

    console.log("🧬 MutationAgent started");

    await page.evaluate(() => {

      window.__mutationTime = Date.now();

      const observer = new MutationObserver(() => {
        window.__mutationTime = Date.now();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
      });

    });
  }

  async check(page) {

    const lastMutation = await page.evaluate(() => window.__mutationTime || Date.now());

    const idleTime = Date.now() - lastMutation;

    // ⭐ If DOM not changed for 8 seconds → possible freeze
    if (idleTime > 8000) {
      console.log("⚠️ Anomaly: UI mutation freeze detected");
    }

  }
}

module.exports = MutationAgent;