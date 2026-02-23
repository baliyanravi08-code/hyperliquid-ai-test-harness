class AnomalyReporter {

  constructor(page) {
    this.page = page;
    this.issues = [];
  }

  async report(type, severity, message) {

    const issue = {
      type,
      severity,
      message,
      time: new Date().toISOString()
    };

    console.log("🚨 AUTONOMOUS ISSUE DETECTED:", issue);

    // 📸 capture screenshot evidence
    try {
      await this.page.screenshot({
        path: `docs/anomaly-${Date.now()}.png`,
        fullPage: true
      });
    } catch {}

    this.issues.push(issue);
  }

  getIssues() {
    return this.issues;
  }

}

module.exports = AnomalyReporter;