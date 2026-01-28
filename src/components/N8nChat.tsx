import { useEffect } from "react";
import { createChat } from "@n8n/chat";
import "@n8n/chat/style.css";

const N8nChat = () => {
  useEffect(() => {
    createChat({
      webhookUrl:
        "https://n8n.srv1082505.hstgr.cloud/webhook/873362e3-1ba9-4784-81ef-3224c8e44951/chat",

      /** REQUIRED for your workflow */
      enableStreaming: true,
      showWelcomeScreen: false,
      loadPreviousSession: false,

      /** Prevent white placeholder bubble */
      initialMessages: [
        "👋 Hi! Welcome to Dezhyne Labs.",
        "How can we help you today?",
      ],

      /** Header text */
      i18n: {
        en: {
          title: "Dezhyne Labs | Chatbot",
          subtitle: "Digital Agency Support",
          inputPlaceholder: "Type your message here…",
        },
      },
    });
  }, []);

  return null;
};

export default N8nChat;
