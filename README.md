# 🚀 AI Autonomous Web Testing Harness — Hyperliquid (WebMCP-Inspired)

![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![NodeJS](https://img.shields.io/badge/Node.js-Backend-blue)
![AI Agents](https://img.shields.io/badge/AI-Agent%20Driven-purple)
![Architecture](https://img.shields.io/badge/Harness-Engineering-orange)
![Status](https://img.shields.io/badge/Portfolio-Senior%20Level-success)

![Autonomous Harness Demo](docs/demo.png)

An advanced AI-driven autonomous testing harness built with Playwright + Node.js using a multi-agent architecture.

This project demonstrates how modern QA automation evolves from rigid scripts into intelligent autonomous systems using:

✔ Context-aware testing  
✔ Agent decision making  
✔ Semantic self-healing  
✔ WebSocket observability  
✔ Autonomous execution loops  

Inspired by emerging concepts like WebMCP, intelligent testing systems, and Harness Engineering.


--------------------------------------------------
🧠 PROJECT VISION
--------------------------------------------------

Traditional automation depends on:

- Static locators
- Sequential steps
- Fragile selectors

This harness introduces:

Agent-based reasoning
+
Intent-driven execution
+
Autonomous loop
+
Observability-first testing

Instead of writing manual flows, agents analyze UI context and decide what to do next.


--------------------------------------------------
🏗️ ARCHITECTURE OVERVIEW
--------------------------------------------------

AI Agent Layer:

- CoordinatorAgent
- NavigatorAgent
- TraderAgent
- ValidatorAgent

Harness Layer:

- TestHarness
- IntentResolver
- Self-Healing Engine

Execution Layer:

- Playwright
- WebSocket Observer

This mirrors modern Harness Engineer architecture patterns.


--------------------------------------------------
⚙️ TECH STACK
--------------------------------------------------

- Playwright
- Node.js
- JavaScript
- Autonomous Agent Pattern
- Semantic UI Targeting
- WebSocket Monitoring
- Intelligent Test Harness


--------------------------------------------------
✨ CORE FEATURES
--------------------------------------------------

🤖 Multi-Agent Architecture

Agents collaborate dynamically:

- CoordinatorAgent → memory & orchestration
- NavigatorAgent → navigation logic
- TraderAgent → wallet/trading actions
- ValidatorAgent → validation & assertions


🔁 Autonomous Harness Engine

Agent decides intent
↓
IntentResolver executes action
↓
Page state updates
↓
Agent decides next action

No rigid scripts required.


🧠 Semantic Self-Healing Engine

Instead of brittle selectors:

- semantic targeting
- context-aware fallback logic
- cross-browser handling
- dynamic UI resilience

Designed for complex crypto trading interfaces.


📡 WebSocket Observability

Harness monitors live market streams:

- detects WebSocket connections
- logs live frames
- validates real-time updates

Simulates production-level observability.


🧠 GPT Hybrid Brain (Safe Mode)

Optional AI reasoning layer:

- rich context builder
- offline fallback logic
- timeout-safe execution
- rate-limit protection

System continues working even without AI responses.


--------------------------------------------------
📂 PROJECT STRUCTURE
--------------------------------------------------

hyperliquid-ai-test-harness/

agents/
  coordinatorAgent.js
  navigatorAgent.js
  tradeAgent.js
  validatorAgent.js
  gptBrain.js

harness/
  runner.js

pages/
  tradePage.js

utils/
  intentResolver.js
  selfHealing.js
  wsObserver.js

tests/
  example.spec.js

playwright.config.js
README.md


--------------------------------------------------
▶️ HOW TO RUN
--------------------------------------------------

Install dependencies:

npm install

Install browsers:

npx playwright install

Run tests:

npx playwright test

Run specific browser:

npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit


--------------------------------------------------
🔍 AUTONOMOUS FLOW SAMPLE
--------------------------------------------------

🚀 Harness started  
🧭 NavigatorAgent analyzing URL  
⚡ Executing intent: NAVIGATE  
🌐 Opening trade page  

💼 TraderAgent checking wallet  
🧠 Self-healing click attempt: Connect  

📡 WebSocket observer started  
📥 WS Frame received  

✅ Scenario complete


--------------------------------------------------
⚠️ KNOWN LIMITATIONS
--------------------------------------------------

Firefox may intermittently fail on the "Connect Wallet" interaction due to:

- dynamic rendering differences in Hyperliquid UI
- duplicate semantic buttons
- animation timing differences across browsers

Chromium and WebKit runs are stable.

This reflects real-world automation challenges on live trading platforms.


--------------------------------------------------
💡 WHY THIS PROJECT STANDS OUT
--------------------------------------------------

This repository demonstrates:

- Harness engineering design
- Agent-based testing architecture
- Autonomous execution flow
- Self-healing UI automation
- Real-time data validation

Represents the shift from traditional QA into intelligent autonomous testing systems.


--------------------------------------------------
🧭 FUTURE ROADMAP
--------------------------------------------------

- WebMCP protocol integration
- DOM context scoring
- visual awareness layer
- multi-session agents
- distributed harness runners


--------------------------------------------------
👨‍💻 AUTHOR
--------------------------------------------------

Advanced QA automation portfolio project focused on:

- Playwright architecture
- AI-driven testing
- Autonomous harness design
- Real-world trading UI automation


--------------------------------------------------
⭐ REPOSITORY HIGHLIGHTS
--------------------------------------------------

✔ Multi-Agent Architecture  
✔ Autonomous Harness Loop  
✔ WebSocket Monitoring  
✔ Semantic Self-Healing  
✔ GPT Hybrid Brain  
✔ WebMCP-Inspired Design  

🔥 Next-generation intelligent test automation.
