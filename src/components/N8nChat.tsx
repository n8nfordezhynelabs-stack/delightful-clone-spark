import { useEffect } from "react";

const N8nChat = () => {
  useEffect(() => {
    if ((window as any).__DEXHYNE_CHAT__) return;
    (window as any).__DEXHYNE_CHAT__ = true;

    const webhookUrl =
      "https://n8n.srv1082505.hstgr.cloud/webhook/873362e3-1ba9-4784-81ef-3224c8e44951/chat";

    const widget = document.createElement("div");
    widget.className = "dex-chat-widget";
    widget.innerHTML = `
      <button class="dex-chat-toggle">💬</button>

      <div class="dex-chat-box">
        <div class="dex-chat-header">
          <img src="https://www.blushu.in/cdn/shop/files/2.png" />
          <div>
            <strong>Dezhyne Labs</strong>
            <span>Digital Agency Support</span>
          </div>
          <button class="dex-close">×</button>
        </div>

        <div class="dex-chat-messages">
          <div class="dex-bot">👋 Hi! Welcome to Dezhyne Labs.</div>
          <div class="dex-bot">How can we help you today?</div>
        </div>

        <div class="dex-chat-input">
          <input placeholder="Type your message..." />
          <button>Send</button>
        </div>
      </div>
    `;

    document.body.appendChild(widget);

    const box = widget.querySelector(".dex-chat-box") as HTMLElement;
    const toggle = widget.querySelector(".dex-chat-toggle")!;
    const close = widget.querySelector(".dex-close")!;
    const input = widget.querySelector("input")!;
    const sendBtn = widget.querySelector(".dex-chat-input button")!;
    const messages = widget.querySelector(".dex-chat-messages")!;

    toggle.onclick = () => box.classList.toggle("open");
    close.onclick = () => box.classList.remove("open");

    const sendMessage = async () => {
      const text = input.value.trim();
      if (!text) return;

      messages.innerHTML += `<div class="dex-user">${text}</div>`;
      input.value = "";

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatInput: text }),
      });

      const data = await res.json();
      messages.innerHTML += `<div class="dex-bot">${
        data?.[0]?.output ?? "No response"
      }</div>`;

      messages.scrollTop = messages.scrollHeight;
    };

    sendBtn.onclick = sendMessage;
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  }, []);

  return null;
};

export default N8nChat;
