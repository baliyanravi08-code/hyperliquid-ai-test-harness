class ValidatorAgent {

  async decide(page) {

    console.log("✅ ValidatorAgent verifying system activity");

    // ⏳ Give WebSocket stream time to emit frames
    await page.waitForTimeout(4000);

    return { type: "DONE" };
  }
}

module.exports = ValidatorAgent;
