import { useEffect } from "react";
import { createChat } from "@n8n/chat";
import "@n8n/chat/style.css";

const N8nChat = () => {
  useEffect(() => {
    createChat({
      webhookUrl:
        "https://n8n.srv1082505.hstgr.cloud/webhook/4091fa09-fb9a-4039-9411-7104d213f601/chat",

      showWelcomeScreen: false,
      loadPreviousSession: false,

      // 🔥 REQUIRED because your n8n is streaming
      enableStreaming: true,
    });
  }, []);

  // Chat mounts itself, nothing to render
  return null;
};

export default N8nChat;
