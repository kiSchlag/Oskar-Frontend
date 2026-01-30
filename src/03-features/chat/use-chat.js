import { useState, useCallback } from "react";
import { useLocalStorage } from "@/02-shared/hooks";
import { sendMessage as sendChatMessage, deleteSession } from "./chat.service";

export function useChat() {
  const [sessionId, setSessionId] = useLocalStorage("filmzimmer-chat-session", null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favoritesChanges, setFavoritesChanges] = useState(null);

  const sendMessage = useCallback(
    async (text) => {
      const userMsg = { role: "user", content: text };
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);
      setFavoritesChanges(null);

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
        setFavoritesChanges(res.favorites_changes || null);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, something went wrong. Please try again." },
        ]);
        setFavoritesChanges(null);
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
    setFavoritesChanges(null);
  }, [sessionId, setSessionId]);

  const clearFavoritesChanges = useCallback(() => {
    setFavoritesChanges(null);
  }, []);

  return { messages, loading, sendMessage, clearSession, favoritesChanges, clearFavoritesChanges };
}
