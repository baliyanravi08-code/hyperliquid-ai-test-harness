class WebSocketObserver {

  constructor(page) {
    this.page = page;
    this.messages = [];
  }

  start() {

    console.log("📡 WebSocket observer started");

    this.page.on('websocket', ws => {

      console.log("🔌 WebSocket connected:", ws.url());

      ws.on('framereceived', frame => {
        this.messages.push(frame.payload);
        console.log("📥 WS Frame received");
      });

    });
  }

  hasMessages() {
    return this.messages.length > 0;
  }

}

module.exports = WebSocketObserver;
