import { useState, useCallback } from "react";
import { useLocalStorage } from "@/02-shared/hooks";
import { sendMessage as sendChatMessage, deleteSession } from "./chat.service";

export function useChat() {
  const [sessionId, setSessionId] = useLocalStorage("filmzimmer-chat-session", null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(
    async (text) => {
      const userMsg = { role: "user", content: text };
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);

      try {
        const res = await sendChatMessage(text, sessionId);
        setSessionId(res.session_id);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: res.response,
            mediaRecommendation: res.media_recommendation || null,
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, something went wrong. Please try again." },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [sessionId, setSessionId]
  );

  const clearSession = useCallback(async () => {
    if (sessionId) {
      try {
        await deleteSession(sessionId);
      } catch {}
    }
    setSessionId(null);
    setMessages([]);
  }, [sessionId, setSessionId]);

  return { messages, loading, sendMessage, clearSession };
}
