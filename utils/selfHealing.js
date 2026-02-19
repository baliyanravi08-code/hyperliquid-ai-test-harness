async function smartClick(page, label) {

  console.log(`🧠 Self-healing click attempt: "${label}"`);

  try {

    // ⭐ Strategy 1 — Trade panel scoped locator (SUPER STABLE)
    const tradePanel = page.locator('text=Available to Trade').locator('..').locator('..');

    const scopedButton = tradePanel.getByRole('button', { name: label });

    if (await scopedButton.count() > 0) {
      await scopedButton.first().click({ timeout: 5000 });
      console.log("✅ Click success using TRADE PANEL strategy");
      return true;
    }

  } catch (e) {
    console.log("⚠️ Trade panel strategy failed");
  }

  try {

    // ⭐ Strategy 2 — visible button only (cross-browser safe)
    const visibleButton = page.locator(`button:has-text("${label}")`).filter({ has: page.locator(':visible') });

    if (await visibleButton.count() > 0) {
      await visibleButton.first().click({ timeout: 5000 });
      console.log("✅ Click success using VISIBLE strategy");
      return true;
    }

  } catch (e) {}

  try {

    // ⭐ Strategy 3 — fallback semantic search
    const semantic = page.getByRole('button', { name: label });

    const count = await semantic.count();

    if (count > 0) {
      await semantic.nth(count - 1).click({ timeout: 5000 });
      console.log("✅ Click success using LAST BUTTON strategy");
      return true;
    }

  } catch (e) {}

  console.log("⚠️ Element not found with self-healing");
  return false;
}

module.exports = { smartClick };
