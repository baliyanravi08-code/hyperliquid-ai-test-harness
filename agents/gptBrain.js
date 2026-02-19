require('dotenv').config();
const OpenAI = require('openai');

class GPTBrain {

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // 🧠 AI cooldown state
    this.aiDisabledUntil = 0;
  }

  async think(context, memory = []) {

    console.log("🧠 GPT Brain analyzing context:", context);

    const now = Date.now();

    // 🔥 COOL DOWN — skip GPT if quota failed recently
    if (now < this.aiDisabledUntil) {
      console.log("🧊 AI cooldown active — using offline brain");
      return this.offlineDecision(context, memory);
    }

    try {

      const prompt = `
You are an AI QA agent controlling a trading UI.

Memory: ${memory.join(", ")}

Context:
URL: ${context.url}
Title: ${context.title}
Buttons: ${context.visibleButtons.join(", ")}

Return ONLY JSON:
{ "type": "NAVIGATE", "target": "TRADE_PAGE" }
OR
{ "type": "CHECK_WALLET", "label": "Connect" }
OR
{ "type": "DONE" }
`;

      const response = await this.client.responses.create({
        model: "gpt-4.1-mini",
        input: prompt
      });

      const text = response.output_text.trim();
      console.log("🤖 GPT Raw Output:", text);

      return JSON.parse(text);

    } catch (err) {

      console.log("❌ GPT ERROR:", err.message);

      // 🧊 Activate cooldown for 60 seconds
      this.aiDisabledUntil = Date.now() + 60000;

      console.log("🧊 AI disabled for 60 seconds — switching to offline brain");

      return this.offlineDecision(context, memory);
    }
  }

  // 🔥 OFFLINE INTELLIGENT FALLBACK
  offlineDecision(context, memory) {

    if (!context.url.includes("trade") && !memory.includes("NAVIGATED")) {
      return { type: "NAVIGATE", target: "TRADE_PAGE" };
    }

    if (context.visibleButtons.some(btn => btn.includes("Connect")) &&
        !memory.includes("CONNECTED")) {
      return { type: "CHECK_WALLET", label: "Connect" };
    }

    return { type: "DONE" };
  }

}

module.exports = GPTBrain;
