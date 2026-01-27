import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/02-shared/context";
import { fetchMediaNotes, createNote, updateNote, deleteNote } from "./journal.service";

export function useNotes(mediaType, mediaId) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const load = useCallback(() => {
    if (!mediaType || !mediaId) return;
    setLoading(true);
    fetchMediaNotes(mediaType, mediaId)
      .then(setNotes)
      .catch(() => setNotes([]))
      .finally(() => setLoading(false));
  }, [mediaType, mediaId]);

  useEffect(() => {
    load();
  }, [load]);

  const saveNote = useCallback(
    async (content, noteId) => {
      if (noteId) {
        const updated = await updateNote(noteId, { content });
        setNotes((prev) => prev.map((n) => (n.id === noteId ? updated : n)));
        addToast("Note updated", "success");
      } else {
        const created = await createNote({
          media_type: mediaType,
          media_id: mediaId,
          content,
        });
        setNotes((prev) => [...prev, created]);
        addToast("Note saved", "success");
      }
    },
    [mediaType, mediaId, addToast]
  );

  const removeNote = useCallback(
    async (noteId) => {
      await deleteNote(noteId);
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
      addToast("Note deleted", "info");
    },
    [addToast]
  );

  return { notes, loading, saveNote, removeNote, refetch: load };
}
