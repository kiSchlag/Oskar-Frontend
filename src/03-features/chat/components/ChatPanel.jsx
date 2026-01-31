import { useState, useRef, useEffect } from "react";
import { Input, Spinner } from "@/01-ui";
import { useFavorites, useToast } from "@/02-shared/context";
import { useInvalidateNotes } from "@/02-shared/hooks";
import { useChat } from "../use-chat";
import { ChatMessage } from "./ChatMessage";

function getFavoritesToastMessage(items, action) {
  const count = items.length;
  if (count === 0) return null;

  if (count === 1) {
    const title = items[0].title;
    return action === "added"
      ? `Added "${title}" to your journal`
      : `Removed "${title}" from your journal`;
  }

  return action === "added"
    ? `Added ${count} movies to your journal`
    : `Removed ${count} movies from your journal`;
}

function getNotesToastMessage(createdCount, updatedCount) {
  if (createdCount > 0 && updatedCount > 0) {
    return `Added ${createdCount} note${createdCount > 1 ? "s" : ""} and updated ${updatedCount} note${updatedCount > 1 ? "s" : ""}`;
  }
  if (createdCount > 0) {
    return createdCount === 1 ? "Added a new note" : `Added ${createdCount} new notes`;
  }
  if (updatedCount > 0) {
    return updatedCount === 1 ? "Updated a note" : `Updated ${updatedCount} notes`;
  }
  return null;
}

export function ChatPanel({ onClose }) {
  const {
    messages,
    loading,
    sendMessage,
    clearSession,
    favoritesChanges,
    clearFavoritesChanges,
    notesChanges,
    clearNotesChanges,
  } = useChat();
  const { isFavorite, toggleFavorite, invalidateFavorites } = useFavorites();
  const invalidateNotes = useInvalidateNotes();
  const { addToast } = useToast();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!favoritesChanges) return;

    const { items } = favoritesChanges;

    invalidateFavorites();

    if (items && items.length > 0) {
      const addedItems = items.filter(item => item.action === "added");
      const removedItems = items.filter(item => item.action === "removed");

      if (addedItems.length > 0) {
        addToast(getFavoritesToastMessage(addedItems, "added"), "success");
      }

      if (removedItems.length > 0) {
        addToast(getFavoritesToastMessage(removedItems, "removed"), "info");
      }
    }

    clearFavoritesChanges();
  }, [favoritesChanges, invalidateFavorites, addToast, clearFavoritesChanges]);

  useEffect(() => {
    if (!notesChanges) return;

    const { items, created_count, updated_count } = notesChanges;

    if (items && items.length > 0) {
      const seen = new Set();
      items.forEach((item) => {
        const key = `${item.media_type}-${item.media_id}`;
        if (!seen.has(key)) {
          seen.add(key);
          invalidateNotes(item.media_type, item.media_id);
        }
      });
    }

    const toastMessage = getNotesToastMessage(created_count, updated_count);
    if (toastMessage) {
      addToast(toastMessage, "success");
    }

    clearNotesChanges();
  }, [notesChanges, invalidateNotes, addToast, clearNotesChanges]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    sendMessage(text);
  };

  return (
    <div className="fixed bottom-20 right-6 w-[560px] max-w-[calc(100vw-2rem)] h-[650px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
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
          <ChatMessage
            key={i}
            message={msg}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
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
