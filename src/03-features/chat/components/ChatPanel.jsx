import { useState, useRef, useEffect } from "react";
import { Input, Spinner } from "@/01-ui";
import { useChat } from "../use-chat";
import { ChatMessage } from "./ChatMessage";

export function ChatPanel({ onClose }) {
  const { messages, loading, sendMessage, clearSession } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    sendMessage(text);
  };

  return (
    <div className="fixed bottom-20 right-6 w-96 max-w-[calc(100vw-2rem)] h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-darker">
        <div>
          <h3 className="text-text font-semibold text-sm">Oskar</h3>
          <p className="text-text-muted text-xs">AI Movie Assistant</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearSession}
            className="text-text-muted hover:text-text text-xs transition-colors"
            aria-label="Clear conversation"
          >
            Clear
          </button>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text transition-colors"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-text-muted text-sm text-center mt-8">
            Ask Oskar for movie recommendations, information, or anything
            cinema-related!
          </p>
        )}
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
              <Spinner size="sm" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-3 border-t border-border bg-darker"
      >
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Oskar..."
            className="text-sm"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-accent hover:bg-accent-hover text-white px-4 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
