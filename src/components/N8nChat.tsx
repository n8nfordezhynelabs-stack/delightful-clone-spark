import { useEffect } from "react";

const N8nChat = () => {
  useEffect(() => {
    if ((window as any).__DEXHYNE_CHAT__) return;
    (window as any).__DEXHYNE_CHAT__ = true;

    const webhookUrl =
      "https://n8n.srv1082505.hstgr.cloud/webhook/873362e3-1ba9-4784-81ef-3224c8e44951/chat";
    const webhookRoute = "general";
    const brandName = "Dezhyne Labs";
    const brandLogo = "https://www.blushu.in/cdn/shop/files/2.png";
    const welcomeText = "Hi 👋 Welcome to Dezhyne Labs!";
    const responseTimeText = "We usually respond instantly";

    let currentSessionId = "";

    function generateUUID() {
      return crypto.randomUUID();
    }

    function sanitizeHTML(text: string): string {
      if (!text) return "";
      text = text.replace(/\\n/g, "\n");

      // Escape HTML first
      const div = document.createElement("div");
      div.textContent = text;
      let escaped = div.innerHTML;

      // Convert markdown links
      escaped = escaped.replace(
        /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
      );
      // Convert bold
      escaped = escaped.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      // Convert bullet points
      escaped = escaped.replace(
        /^(?:•|-)\s+(.*)$/gm,
        "<li>$1</li>"
      );
      escaped = escaped.replace(
        /(<li>.*<\/li>)/gs,
        "<ul>$1</ul>"
      );
      // Line breaks
      escaped = escaped.replace(/\n/g, "<br>");
      return escaped;
    }

    // Build widget
    const widget = document.createElement("div");
    widget.className = "dex-chat-widget";

    // Toggle button
    const toggle = document.createElement("button");
    toggle.className = "dex-chat-toggle";
    toggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;

    // Chat box
    const box = document.createElement("div");
    box.className = "dex-chat-box";

    // Header
    const header = document.createElement("div");
    header.className = "dex-chat-header";
    const logoImg = document.createElement("img");
    logoImg.src = brandLogo;
    logoImg.alt = brandName;
    const headerInfo = document.createElement("div");
    const headerName = document.createElement("strong");
    headerName.textContent = brandName;
    const headerSub = document.createElement("span");
    headerSub.textContent = "Digital Agency Support";
    headerInfo.appendChild(headerName);
    headerInfo.appendChild(headerSub);
    const closeBtn = document.createElement("button");
    closeBtn.className = "dex-close";
    closeBtn.textContent = "×";
    header.appendChild(logoImg);
    header.appendChild(headerInfo);
    header.appendChild(closeBtn);

    // Welcome screen
    const welcomeScreen = document.createElement("div");
    welcomeScreen.className = "dex-welcome-screen";
    const welcomeP = document.createElement("p");
    welcomeP.className = "dex-welcome-text";
    welcomeP.textContent = welcomeText;
    const newChatBtn = document.createElement("button");
    newChatBtn.className = "dex-new-chat-btn";
    newChatBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Send us a message`;
    const responseP = document.createElement("p");
    responseP.className = "dex-response-text";
    responseP.textContent = responseTimeText;
    welcomeScreen.appendChild(welcomeP);
    welcomeScreen.appendChild(newChatBtn);
    welcomeScreen.appendChild(responseP);

    // Chat interface (hidden initially)
    const chatInterface = document.createElement("div");
    chatInterface.className = "dex-chat-interface";

    const messages = document.createElement("div");
    messages.className = "dex-chat-messages";

    const inputArea = document.createElement("div");
    inputArea.className = "dex-chat-input";
    const textarea = document.createElement("textarea");
    textarea.placeholder = "Type your message...";
    textarea.rows = 1;
    const sendBtn = document.createElement("button");
    sendBtn.textContent = "Send";
    inputArea.appendChild(textarea);
    inputArea.appendChild(sendBtn);

    const footer = document.createElement("div");
    footer.className = "dex-chat-footer";
    footer.textContent = "Powered by Dezhyne Labs";

    chatInterface.appendChild(messages);
    chatInterface.appendChild(inputArea);
    chatInterface.appendChild(footer);

    box.appendChild(header);
    box.appendChild(welcomeScreen);
    box.appendChild(chatInterface);

    widget.appendChild(box);
    widget.appendChild(toggle);
    document.body.appendChild(widget);

    // Event handlers
    toggle.addEventListener("click", () => box.classList.toggle("open"));
    closeBtn.addEventListener("click", () => box.classList.remove("open"));

    async function startNewConversation() {
      currentSessionId = generateUUID();
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([{
            action: "loadPreviousSession",
            sessionId: currentSessionId,
            route: webhookRoute,
            metadata: { userId: "" },
          }]),
        });

        const data = await response.json();
        welcomeScreen.style.display = "none";
        chatInterface.classList.add("active");

        const botMsg = document.createElement("div");
        botMsg.className = "dex-bot";
        const output = Array.isArray(data) ? data[0]?.output : data?.output;
        botMsg.innerHTML = sanitizeHTML(output || "How can we help you today?");
        messages.appendChild(botMsg);
        messages.scrollTop = messages.scrollHeight;
      } catch {
        welcomeScreen.style.display = "none";
        chatInterface.classList.add("active");
        const botMsg = document.createElement("div");
        botMsg.className = "dex-bot";
        botMsg.textContent = "👋 Hi! How can we help you today?";
        messages.appendChild(botMsg);
      }
    }

    async function sendMessage() {
      const text = textarea.value.trim();
      if (!text) return;

      // User message (safe)
      const userMsg = document.createElement("div");
      userMsg.className = "dex-user";
      userMsg.textContent = text;
      messages.appendChild(userMsg);
      textarea.value = "";

      // Typing indicator
      const typingDiv = document.createElement("div");
      typingDiv.className = "dex-bot dex-typing";
      typingDiv.innerHTML = `<span></span><span></span><span></span>`;
      messages.appendChild(typingDiv);
      messages.scrollTop = messages.scrollHeight;

      try {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "sendMessage",
            sessionId: currentSessionId,
            route: webhookRoute,
            chatInput: text,
            metadata: { userId: "" },
          }),
        });

        const data = await res.json();
        typingDiv.remove();

        const botMsg = document.createElement("div");
        botMsg.className = "dex-bot";
        const output = Array.isArray(data) ? data[0]?.output : data?.output;
        botMsg.innerHTML = sanitizeHTML(output || "No response");
        messages.appendChild(botMsg);
      } catch {
        typingDiv.remove();
        const errMsg = document.createElement("div");
        errMsg.className = "dex-bot";
        errMsg.textContent = "Sorry, something went wrong. Please try again.";
        messages.appendChild(errMsg);
      }

      messages.scrollTop = messages.scrollHeight;
    }

    newChatBtn.addEventListener("click", startNewConversation);
    sendBtn.addEventListener("click", sendMessage);
    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }, []);

  return null;
};

export default N8nChat;
