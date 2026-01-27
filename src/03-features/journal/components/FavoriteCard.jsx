import { useCallback } from "react";
import { Card } from "@/01-ui";
import { LazyImage } from "@/02-shared/components/lazy-image";
import { posterUrl } from "@/02-shared/constants";
import { formatDate, formatRating } from "@/02-shared/utils";
import { useNotes } from "../use-notes";
import { NoteEditor } from "./NoteEditor";

export function FavoriteCard({ favorite, details, onRemove }) {
  const title = favorite.title;
  const imgSrc = posterUrl(favorite.poster_path);
  const { notes, saveNote } = useNotes(favorite.media_type, favorite.media_id);
  const note = notes[0] || null;

  const handleRemove = useCallback(
    (e) => {
      e.stopPropagation();
      onRemove(favorite.id);
    },
    [favorite.id, onRemove]
  );

  return (
    <Card className="flex flex-col" id={`fav-${favorite.id}`}>
      <div className="aspect-[2/3] relative overflow-hidden">
        <LazyImage
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={handleRemove}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-600/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
          aria-label="Remove from journal"
        >
          ✕
        </button>
      </div>
      <div className="p-3 flex flex-col gap-2 flex-1">
        <h3 className="text-text font-medium text-sm truncate">{title}</h3>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span className="capitalize">{favorite.media_type}</span>
          {details?.release_date || details?.first_air_date ? (
            <span>
              {formatDate(details.release_date || details.first_air_date)}
            </span>
          ) : null}
          {details?.vote_average > 0 && (
            <span className="text-yellow-400">
              ★ {formatRating(details.vote_average)}
            </span>
          )}
        </div>
        <NoteEditor note={note} onSave={saveNote} />
      </div>
    </Card>
  );
}
