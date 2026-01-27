import { useState, useEffect, useRef } from "react";
import { useDebounce } from "@/02-shared/hooks";

export function NoteEditor({ note, onSave }) {
  const [content, setContent] = useState(note?.content || "");
  const debouncedContent = useDebounce(content, 800);
  const savedRef = useRef(note?.content || "");

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
      placeholder="Add a personal note..."
      className="w-full bg-darker border border-border rounded-lg px-3 py-2 text-text text-sm placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent resize-none min-h-[80px]"
    />
  );
}
