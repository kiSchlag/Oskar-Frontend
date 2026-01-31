import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useToast } from "@/02-shared/context/toast-context";
import {
  fetchMediaNotes,
  createNote,
  updateNote,
  deleteNote,
} from "@/03-features/journal/journal.service";
import { queryKeys } from "@/02-shared/lib";

export function useNotesQuery(mediaType, mediaId) {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const {
    data: notes = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: queryKeys.notes.media(mediaType, mediaId),
    queryFn: () => fetchMediaNotes(mediaType, mediaId),
    enabled: Boolean(mediaType && mediaId),
  });

  const saveMutation = useMutation({
    mutationFn: async ({ content, noteId }) => {
      if (noteId) {
        return updateNote(noteId, { content });
      } else {
        return createNote({
          media_type: mediaType,
          media_id: mediaId,
          content,
        });
      }
    },
    onMutate: async ({ content, noteId }) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.notes.media(mediaType, mediaId),
      });

      const previousNotes = queryClient.getQueryData(
        queryKeys.notes.media(mediaType, mediaId)
      );

      queryClient.setQueryData(
        queryKeys.notes.media(mediaType, mediaId),
        (old = []) => {
          if (noteId) {
            return old.map((n) => (n.id === noteId ? { ...n, content } : n));
          } else {
            return [...old, { id: `temp-${Date.now()}`, content }];
          }
        }
      );

      return { previousNotes };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        queryKeys.notes.media(mediaType, mediaId),
        context.previousNotes
      );
      addToast("Failed to save note", "error");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notes.media(mediaType, mediaId),
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (noteId) => deleteNote(noteId),
    onMutate: async (noteId) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.notes.media(mediaType, mediaId),
      });

      const previousNotes = queryClient.getQueryData(
        queryKeys.notes.media(mediaType, mediaId)
      );

      queryClient.setQueryData(
        queryKeys.notes.media(mediaType, mediaId),
        (old = []) => old.filter((n) => n.id !== noteId)
      );

      return { previousNotes };
    },
    onSuccess: () => {
      addToast("Note deleted", "info");
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        queryKeys.notes.media(mediaType, mediaId),
        context.previousNotes
      );
      addToast("Failed to delete note", "error");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notes.media(mediaType, mediaId),
      });
    },
  });

  const saveNote = useCallback(
    (content, noteId = null) => {
      saveMutation.mutate({ content, noteId });
    },
    [saveMutation]
  );

  const removeNote = useCallback(
    (noteId) => {
      removeMutation.mutate(noteId);
    },
    [removeMutation]
  );

  const invalidateNotes = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.notes.media(mediaType, mediaId),
    });
  }, [queryClient, mediaType, mediaId]);

  return {
    notes,
    loading,
    saveNote,
    removeNote,
    refetch,
    invalidateNotes,
  };
}

export function useInvalidateNotes() {
  const queryClient = useQueryClient();

  return useCallback(
    (mediaType, mediaId) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notes.media(mediaType, mediaId),
      });
    },
    [queryClient]
  );
}
