import { useState, useEffect, useRef } from "react";
import { useDebounce } from "@/02-shared/hooks";

export function NoteEditor({ note, onSave }) {
  const [content, setContent] = useState(note?.content || "");
  const debouncedContent = useDebounce(content, 800);
  const savedRef = useRef(note?.content || "");

  // Sync local state when note prop changes (from API fetch or real-time update)
  useEffect(() => {
    setContent(note?.content || "");
    savedRef.current = note?.content || "";
  }, [note?.content]);

  useEffect(() => {
    if (debouncedContent && debouncedContent !== savedRef.current) {
      onSave(debouncedContent, note?.id || null);
      savedRef.current = debouncedContent;
    }
  }, [debouncedContent, note?.id, onSave]);

  return (
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      placeholder="What did you think? What stood out?"
      className="w-full h-full bg-darker border border-border rounded-lg px-3 py-2 text-text text-sm placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent resize-none min-h-[100px]"
    />
  );
}
